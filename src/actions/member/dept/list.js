/**
 * Created by alixez on 17-6-17.
 */
import {getSuccessCode, getErrorCode} from '../../../config/response';

export default async function (req, params, {models, device}) {
  const DeptModel = models.Dept.scope('list');
  const deptCount = await DeptModel.count();
  console.log(deptCount);
  if (deptCount === 0) {
    return {
      code: getSuccessCode(),
      message: '查看成功',
      data: {
        depts: [],
      }
    }
  }
  const deepDeptLevel = await DeptModel.findOne({
      attributes: [[models.sequelize.fn('MAX', models.sequelize.col('tree_level')), 'max_tree_level']],
    });


  const getIncludeArgs = (times) => {
    let includeArgs = [];
    if (device === 'app') {
      includeArgs = [
        {model: models.Dept, as: 'children'},
        {model: models.User, as: 'members', attributes: ['id', 'name', 'avatar']}
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
    include: includeArgs
  });

  if (device === 'app') {
    for (let i = 0; i < list.length; i ++) {
      let item = list[i];
      item.dataValues.member_total = recursiveMemberCount(item.children) + item.members.length;
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



function recursiveMemberCount(children) {
  let count = 0;
  for (let i = 0; i < children.length; i ++) {
    let item = children[i];
    if (item.children.length > 0) {
      item.dataValues.member_total = recursiveMemberCount(item.children) + item.members.length;

    } else {
      item.dataValues.member_total = item.members.length;
    }

    count += item.dataValues.member_total;
  }


  return count;
}