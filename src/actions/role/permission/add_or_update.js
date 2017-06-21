/**
 * Created by alixez on 17-6-22.
 */

export default async function (req, params, {models, response}) {
  const {permissions, platform} = req.body;

  if (!permissions || typeof permissions === 'string') {
    return response.errorResp(`permissions参数接收一个数组`);
  }

  permissions.forEach(async item => {
    await models.RolePermission.findOrCreate({where: {}})
  })
}