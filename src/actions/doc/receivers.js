/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/20
 */

export default async (req, params, {response, services}) => {
  const id = req.query.id;

  if (!id) {
    return {
      code: response.getErrorCode(),
      message: '参数错误',
    }
  }

  const {result, resultMapper} = await services.doc.getUnreadDetails(id);
  const deptStruct = await services.dept.deptStruct();
  const res = recursiveRenderDept(deptStruct[0].children, resultMapper);

  for (let i = 0; i < res.length; i ++) {
    let item = res[i];
    item.dataValues.member_total = recursiveMemberCount(item.children) + item.dataValues.members.length;
  }

  return {
    code: response.getSuccessCode(),
    message: '查询成功',
    data: {
      receivers: res,
    }
  }
}

function recursiveMemberCount(children) {
  let count = 0;
  for (let i = 0; i < children.length; i ++) {
    let item = children[i];
    if (item.children.length > 0) {
      item.dataValues.member_total = recursiveMemberCount(item.children) + item.dataValues.members.length;

    } else {
      item.dataValues.member_total = item.dataValues.members.length;
    }

    count += item.dataValues.member_total;
  }


  return count;
}

function recursiveRenderDept(children, mapper) {

  return children.map(looper => {
    if (looper.children.length > 0) {
      looper.children = recursiveRenderDept(looper.children, mapper);
    }

    looper.setDataValue('members', []);
    // looper.setDataValue('member_total', 0);

    if (looper.tree_level === 3) {

      let res = mapper[looper.id];
      if (res) {
        // console.log('---- ', res.people);
        // looper.setDataValue('members', ['1']);
        looper.dataValues.members = res.people;
        // looper.dataValues.member_total = res.people_total;
        // looper.setDataValue('members', res.people);
      }
    }

    return looper;
  })
}