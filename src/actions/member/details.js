/**
 * Created by alixez on 17-7-26.
 */

export default async function (req, params, {response, models}) {
  const UserModel = models.User;
  const userID = req.query.user;
  if (!userID) {
    return {
      code: response.getErrorCode(),
      message: '参数错误',
    }
  }
  const user = await UserModel.findOne({
    where: {
      id: userID,
    },
    include: [
      {model: models.Role, as: 'user_role'},
      {model: models.Dept, as: 'department'}
    ],
    attributes: {
      exclude: [ 'dept', 'role', 'password', 'deleted']
    },
  });

  if (!user) {
    return {
      code: response.getErrorCode(),
      message: '没有找到该用户',
    }
  }

  return {
    code: response.getSuccessCode(),
    message: '查询成功',
    data: {
      user: user,
    }
  }
}