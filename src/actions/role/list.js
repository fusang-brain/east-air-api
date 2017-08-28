/**
 * Created by alixez on 17-6-20.
 */
import {getSuccessCode, getErrorCode} from '../../config/response';

// list or search role
export default async function (req, params, {models, device}) {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;
  const RoleModel = models.Role;
  const total = await RoleModel.count({
    where: {
      available: true,
    }
  });
  const list = await RoleModel.all({
    where: {
      available: true,
    },
    offset,
    limit,
  });

  return {
    code: getSuccessCode(),
    message: '查询成功',
    data: {
      total: total,
      role_list: list,
    }
  }
}