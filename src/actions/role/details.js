/**
 * Created by alixez on 17-6-22.
 */

export default async function(req, params, {models, response}) {
  const {id} = req.query;

  if (!id) {
    return response.errorResp('参数错误');
  }

  const role = await models.Role.findOne({
    where: {
      id,
    }
  });

  // include: [
  //   {
  //     attributes: {
  //       exclude: ['role_permission'],
  //     },
  //     model: models.Permission,
  //     as: 'permissions',
  //     through: {
  //       as: 'role_permission',
  //     },
  //     where: {
  //       slug: 'start',
  //     }
  //   }
  // ]
  const permission = {};
  permission.web = await role.getPermissions({
    attributes: {
      exclude: ['role_permission'],
    },
    through: {
      as: 'role_permission',
      where: {
        platform: 'web'
      }
    }
  });
  permission.app = await role.getPermissions({
    attributes: {
      exclude: ['role_permission'],
    },
    through: {
      as: 'role_permission',
      where: {
        platform: 'app'
      }
    }
  });

  return response.successResp('查询成功', null, {role, permission});
}