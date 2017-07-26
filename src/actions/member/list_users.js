/**
 * Created by alixez on 17-7-26.
 */

export default async function (req, params, {models, response}) {
  const UserModel = models.User;
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;

  const list = await UserModel.all({
    attributes: ['id', 'name', 'avatar'],
    offset,
    limit,
  });

  return {
    code: response.getSuccessCode(),
    message: '查询成功',
    data: {
      users: list,
    }
  }
}