/**
 * Created by alixez on 17-6-17.
 */
import cacher from 'sequelize-redis-cache';
import redis from 'redis';
import delve from 'dlv';
import config from '../../../config';
import {getSuccessCode, getErrorCode} from '../../../config/response';

export default async function (req, params, {models, device}) {
  var rc = redis.createClient({
    port: config.redis.port,
    password: config.redis.password,
    auth_pass: config.redis.password,
  });
  let flag = req.query.flag;
  if (device == 'web' || device == 'pc') {
    flag = 'more';
  }
  const DeptModel = models.Dept.scope('list');
  const deptCount = await DeptModel.count();
  if (deptCount === 0) {
    return {
      code: getSuccessCode(),
      message: '查看成功',
      data: {
        depts: [],
      }
    }
  }

  let renderType = params[0];
  const deepDeptLevel = await DeptModel.findOne({
      attributes: [[models.sequelize.fn('MAX', models.sequelize.col('tree_level')), 'max_tree_level']],
    });

  const Dept = models.Dept;
  const User = models.User;
  req.dataAccess.push(delve(req.user, 'department.parent'));
  req.dataAccess.push(delve(req.user, 'department.id'));
  const getIncludeArgs = (times) => {
    let includeArgs = [];
    if (device === 'app' || renderType === 'with_member') {
      const condition = {
        state: {
          $in: [0, 1]
        },
        name: {$ne: 'root'}
      };

      // condition.dept =  {
      //   $in: req.dataAccess.length > 0 ? req.dataAccess : [req.user.department.parent],
      // };
      includeArgs = [
        { model: Dept, as: 'children' },
        // { model: User, as: 'members', where: condition, required: false, attributes: ['id', 'name', 'avatar'] },
      ];
    } else {
      includeArgs = [
        {model: Dept, as: 'children'},
      ]
    }

    times -= 1;
    if (times > 0) {
      includeArgs[0].include = getIncludeArgs(times);
    }

    return includeArgs;
  };

  const includeArgs = getIncludeArgs(deepDeptLevel.dataValues.max_tree_level);
  // console.log('include args', includeArgs[0].include);
  if (device === 'app' || renderType === 'with_member') {
    const condition = {
      state: {
        $in: [0, 1]
      },
      name: {$ne: 'root'}
    };
    includeArgs[0].include[0].include.push({ model: User, as: 'members', where: condition, required: false, attributes: ['id', 'name', 'avatar'] });
    includeArgs[0].include.push({ model: User, as: 'members', where: condition, required: false, attributes: ['id', 'name', 'avatar'] });

  }
  // console.log(DeptModel.cache());
  // var cacheObj = (device === 'app' ? DeptModel : cacher(models.sequelize, rc).model(DeptModel.name).ttl(15 * 60));
  var cacheObj = cacher(models.sequelize, rc).model(DeptModel.name).ttl(15 * 60);
  const list = await cacheObj.findAll({
    where: {tree_level: 1},
    include: includeArgs,
  });
  // console.log("returned .... ", list);
  if (device === 'app') {
    for (let i = 0; i < list.length; i ++) {
      let item = list[i];
      if (item.dataValues) {
        item.dataValues.member_total = recursiveMemberCount(item.children, req.dataAccess, flag) + (item.members ? item.members.length : 0);
      } else {
        item.member_total = recursiveMemberCount(item.children, req.dataAccess, flag) + (item.members ? item.members.length : 0);
      }
    }

    return {
      code: getSuccessCode(),
      message: '查看成功',
      data: {
        depts: list[0].children,
      }
    }
  }
  if (renderType === 'with_member') {
    return {
      code: getSuccessCode(),
      message: '查看成功',
      data: {
        depts: recursiveRenderDept(list[0].children)
        // depts: list,
      }
    }
  }

  return {
    code: getSuccessCode(),
    message: '查看成功',
    data: {
      depts: list,
    }
  }
}

function recursiveRenderDept(children) {

  return children.map(looper => {
    let children = [];
    if (looper.children.length > 0) {
      children = recursiveRenderDept(looper.children);
    }

    if (looper.tree_level === 3) {
      children = looper.members.map(item => ({
        id: item.id,
        name: item.name,
        tree_level: looper.tree_level + 1,
        avatar: item.avatar,
      }));
    }

    return {
      id: looper.id,
      name: looper.dept_name,
      tree_level: looper.tree_level,
      children: children,
    }
  })
}

function recursiveMemberCount(children, dataAccess, flag) {
  let count = 0;
  for (let i = 0; i < children.length; i ++) {
    let item = children[i];
    console.log(item);
    if (item.children.length > 0) {
      if (item.dataValues) {
        item.dataValues.member_total = recursiveMemberCount(item.children, dataAccess, flag) + (item.members ? item.members.length : 0);
      } else {
        item.member_total = recursiveMemberCount(item.children, dataAccess, flag) + (item.members ? item.members.length : 0);
      }

    } else {
      if (item.dataValues) {
        item.dataValues.member_total = (item.members ? item.members.length : 0);
      } else {
        item.member_total = (item.members ? item.members.length : 0);
      }

    }
    if (flag !== 'more') {
      if (!dataAccess.includes(item.id)) {
        if (item.dataValues) {
          item.dataValues.members = [];
        } else {
          item.members = [];
        }

      }
    }
    if (item.dataValues) {
      count += item.dataValues.member_total ? item.dataValues.member_total : 0;
    } else {
      count += item.member_total;
    }

  }


  return count;
}