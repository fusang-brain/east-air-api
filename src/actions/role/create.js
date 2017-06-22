/**
 * Created by alixez on 17-6-20.
 */

export default async function (req, params, {models, device, response}) {
  const {role_name, role_description, permissions, platform='web'} = req.body;
  const RoleModel = models.Role;

  if (!role_name || !role_description) {
    return response.errorResp('参数错误');
  }

  const createdRole = await RoleModel.create({
    role_name,
    role_description,
  });

  if (permissions && permissions.length) {
    await createdRole.setPermissions(permissions, {platform});
  }

  return {
    code: response.getSuccessCode('insert'),
    message: '创建成功',
    data: {
      created_role: createdRole,
    }
  }
}