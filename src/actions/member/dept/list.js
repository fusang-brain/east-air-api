/**
 * Created by alixez on 17-6-17.
 */
import {getSuccessCode, getErrorCode} from '../../../config/response';

export default async function (req, params, {models, device}) {
  let flag = req.query.flag;
  if (device === 'web') {
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


  const getIncludeArgs = (times) => {
    let includeArgs = [];
    if (device === 'app' || renderType === 'with_member') {
      const condition = {
        state: {
          $in: [0, 1]
        },

        name: {$ne: 'root'}
      };

      req.dataAccess.push(req.user.department.parent);
      req.dataAccess.push(req.user.department.id);
      // condition.dept =  {
      //   $in: req.dataAccess.length > 0 ? req.dataAccess : [req.user.department.parent],
      // };
      includeArgs = [
        {model: models.Dept, as: 'children'},
        {model: models.User, as: 'members', where: condition, required: false, attributes: ['id', 'name', 'avatar']}
      ];
    } else {
      includeArgs = [
        {model: models.Dept, as: 'children'},
      ]
    }

    times -= 1;
    if (times !== 0) {
      includeArgs[0].include = getIncludeArgs(times);
    }

    return includeArgs;
  };

  const includeArgs = getIncludeArgs(deepDeptLevel.dataValues.max_tree_level);

  const list = await DeptModel.findAll({
    where: {tree_level: 1},
    include: includeArgs,
  });

  if (device === 'app') {
    for (let i = 0; i < list.length; i ++) {
      let item = list[i];
      item.dataValues.member_total = recursiveMemberCount(item.children, req.dataAccess, flag) + item.members.length;
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
    if (item.children.length > 0) {
      item.dataValues.member_total = recursiveMemberCount(item.children, dataAccess, flag) + item.members.length;

    } else {
      item.dataValues.member_total = item.members.length;
    }
    if (flag !== 'more') {
      if (!dataAccess.includes(item.id)) {
        item.dataValues.members = [];
      }
    }

    count += item.dataValues.member_total;
  }


  return count;
}