/**
 * Created by alixez on 17-8-8.
 */

import RoleService from '../../service/RoleService';

export default async function (req, params, {response, checkAccess}) {
  await checkAccess('role_permission', 'remove');
  const id = req.body.id;
  const roleService = new RoleService();

  await roleService.remove(id);

  return {
    code: response.getSuccessCode('remove'),
    message: '角色删除成功',
  }
}