/**
 * Created by alixez on 17-6-20.
 */
import {getSuccessCode, getErrorCode} from '../../config/response';

export default async function (req, params, {models, device, response}) {
  const {role_name, role_description, permissions, platform} = req.body;
  const RoleModel = models.Role;
  const RolePermissionModel = models.RolePermission;

  if (!role_name || !role_description) {
    return response.errorResp('参数错误');
  }

  const createdRole = await RoleModel.create({
    role_name,
    role_description,
  });

  if (permissions && permissions.length) {
    permissions.forEach(async item => {
      await RolePermissionModel.create({
        role_id: createdRole.id,
        permission_id: item,
        platform: platform || 'web',
      });
    })
  }

  return {
    code: response.getSuccessCode('insert'),
    message: '创建成功',
    data: {
      created_role: createdRole,
    }
  }
}