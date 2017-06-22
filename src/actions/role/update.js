/**
 * Created by alixez on 17-6-22.
 */

export default async function (req, params, {models, response}) {
  const {id, role_name, role_description, permissions, platform='web'} = req.body;
  const RoleModel = models.Role;

  if (!id) {
    return response.errorResp('参数错误');
  }

  let createdRole = await RoleModel.findOne({
    where: {id},
  });

  if (!createdRole) {
    return response.errorResp('没有找到该角色', 'update');
  }

  if (role_name) {
    createdRole.role_name = role_name;
  }

  if (role_description) {
    createdRole.role_description = role_description;
  }
  if (role_name || role_description) {
    await createdRole.save();
  }

  await createdRole.setPermissions(permissions, {platform});

  return {
    code: response.getSuccessCode('insert'),
    message: '修改成功',
    data: {
      updated_role: createdRole,
    }
  }
}