/**
 * Created by alixez on 17-6-20.
 */
import {getSuccessCode, getErrorCode} from '../../config/response';

export default async function(req, params, {models, device}) {
  const {search} = req.query;
  const UserModel = models.User;

  const total = await UserModel.count();
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;
  const list = await UserModel.all({
    offset,
    limit,
  });


  return {
    code: getSuccessCode(),
    message: '获取列表成功',
    data: {
      total: total,
      users: list,
    }
  }
}