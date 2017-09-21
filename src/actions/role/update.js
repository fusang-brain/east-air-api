/**
 * Created by alixez on 17-6-22.
 */

export default async function (req, params, {models, response, checkAccess, redisClient}) {
  await checkAccess('role_permission', 'edit');
  const {id, role_name, role_description, web_permissions, app_permissions} = req.body;
  const RoleModel = models.Role;
  const RolePermissionModel = models.RolePermission;

  if (!id) {
    return response.errorResp('参数错误');
  }

  let foundRole = await RoleModel.findOne({
    where: {id},
  });

  if (!foundRole) {
    return response.errorResp('没有找到该角色', 'update');
  }
  if (role_name) {
    const foundExistRole = await RoleModel.findOne({
      where: {
        role_name,
      }
    });

    if (foundExistRole && foundExistRole.id !== id ) {
      return {
        code: response.getErrorCode(),
        message: '该角色已存在',
      }
    }
    foundRole.role_name = role_name;
  }
  if (role_description) {
    foundRole.role_description = role_description;
  }
  if (role_name || role_description) {
    await foundRole.save();
  }

  if (web_permissions) {
    if (web_permissions.length === 0) {
      await RolePermissionModel.destroy({where: {platform: 'web', role_id: foundRole.id}});
    }
    await RolePermissionModel.destroy({where: {platform: 'web', role_id: foundRole.id, permission_id: {$notIn: web_permissions}}});
    for (let i = 0; i < web_permissions.length; i ++) {
      let item = web_permissions[i];
      await RolePermissionModel.findOrCreate({where: {permission_id: item, role_id: foundRole.id, platform: 'web'}, default: {
        role_id: foundRole.id,
        permission_id: item,
        platform: 'web',
      }});
    }
  }

  if (app_permissions) {
    await RolePermissionModel.destroy({where: {platform: 'app', role_id: foundRole.id}});
    for (let i = 0; i < app_permissions.length; i ++) {
      let item = app_permissions[i];
      await RolePermissionModel.findOrCreate({where: {permission_id: item, role_id: foundRole.id, platform: 'app'}, default: {
        role_id: foundRole.id,
        permission_id: item,
        platform: 'app',
      }});
    }
  }

  // 踢出当前修改角色的已登录用户
  const willQuitUser = await models.User.all({
    where: {
      role: id,
    }
  });

  willQuitUser.forEach(user => {
    redisClient.set(`ACCESS_TOKEN_${user.id}`, [], 'EX', 60);
  });

  return {
    code: response.getSuccessCode('update'),
    message: '修改成功',
    data: {
      updated_role: foundRole,
    }
  }
}