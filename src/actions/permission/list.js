/**
 * Created by alixez on 17-6-22.
 */


export default async function(req, params, {models, response}) {
  const PermissionModel = models.Permission;
  const ModuleModel = models.Module;

  const list = await ModuleModel.findAll({
    include: [
      {model: PermissionModel, as: 'permission'},
    ]
  });

  return response.successResp('查看成功', null, {list});
}