/**
 * Created by alixez on 17-6-20.
 */
import {getSuccessCode, getErrorCode} from '../../config/response';

// list or search role
export default async function (req, params, {models, device}) {
  const RoleModel = models.Role;

  const list = await RoleModel.findAll({});

  return {
    code: getSuccessCode(),
    message: '查询成功',
    data: {
      role_list: list,
    }
  }
}