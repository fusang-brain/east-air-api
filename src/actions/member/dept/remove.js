/**
 * Created by alixez on 17-7-27.
 */

export default async function (req, params, {models, response}) {
  const {deptID} = req.body;
  if (!deptID) {
    return {
      code: response.getErrorCode(),
      message: '参数错误',
    }
  }
  const Dept = models.Dept;
  const User = models.User;
  const willDeletedDept = await Dept.findOne({where: {
    id: deptID,
  }});

  if (!willDeletedDept) {
    return {
      code: response.getErrorCode(),
      message: '没有找到该组织'
    }
  }
  const parentDeptID = willDeletedDept.parent;
  await User.update({dept: parentDeptID}, {
    where: {
      dept: deptID,
    }
  });
  await Dept.destroy({
    where: {
      id: deptID,
    }
  });


  return {
    code: response.getSuccessCode('remove'),
    message: '删除成功',
  }
}