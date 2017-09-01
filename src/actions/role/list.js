/**
 * Created by alixez on 17-6-20.
 */
import {getSuccessCode, getErrorCode} from '../../config/response';

// list or search role
export default async function (req, params, {models, device}) {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;
  const search = req.query.search || null;
  const RoleModel = models.Role;
  const condition = {
    available: true,
  }

  if (search) {
    condition.role_name = {
      $like: `%${search}%`
    }
  }
  const total = await RoleModel.count({
    where: condition,
  });

  const list = await RoleModel.all({
    where: condition,
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