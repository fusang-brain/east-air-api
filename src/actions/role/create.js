/**
 * Created by alixez on 17-6-20.
 */

export default async function (req, params, {models, checkAccess, response}) {
  await checkAccess('role_permission', 'create');
  const {role_name, role_description, web_permissions, app_permissions} = req.body;
  const RoleModel = models.Role;
  const RolePermissionModel = models.RolePermission;

  if (!role_name || !role_description) {
    return response.errorResp('参数错误');
  }

  const foundRoleCount = await RoleModel.count({
    where: {
      role_name,
    }
  });

  if (foundRoleCount > 0) {
    return {
      code: response.getErrorCode(),
      message: '该角色已存在',
    }
  }

  const createdRole = await RoleModel.create({
    role_name,
    role_description,
  });

  if (web_permissions) {
    for (let i = 0; i < web_permissions.length; i ++) {
      let item = web_permissions[i];
      await RolePermissionModel.create({
        role_id: createdRole.id,
        permission_id: item,
        platform: 'web',
      });
    }
  }

  if (app_permissions) {
    for (let i = 0; i < app_permissions.length; i ++) {
      let item = app_permissions[i];
      await RolePermissionModel.create({
        role_id: createdRole.id,
        permission_id: item,
        platform: 'app',
      });
    }
  }

  return {
    code: response.getSuccessCode('insert'),
    message: '创建成功',
    data: {
      created_role: createdRole,
    }
  }
}