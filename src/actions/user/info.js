/**
 * Created by alixez on 17-7-31.
 */

export default async function (req, params, {response, models}) {
  const userInfo = req.user;
  userInfo.setDataValue('department', await userInfo.getDepartment());
  return {
    code: response.getSuccessCode(),
    message: '查询成功',
    data: {
      info: userInfo,
    }
  }
}