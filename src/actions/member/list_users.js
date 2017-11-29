/**
 * Created by alixez on 17-7-26.
 */

export default async function (req, params, {models, response}) {
  const UserModel = models.User;
  const search = req.query.search || null;
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;

  const options = {
    attributes: ['id', 'name', 'avatar'],
    offset,
    limit,
  };
  options.where = {
    name: { $ne: 'root' },
  };
  if (search) {
    options.where = {
      name: {
        $like: `%${search}%`,
      }
    };
  }

  req.dataAccess.push(req.user.department.parent);
  req.dataAccess.push(req.user.department.id);

  options.where.dept =  {
    $in: req.dataAccess.length > 0 ? req.dataAccess : [req.user.department.parent],
  };

  const list = await UserModel.all(options);
  return {
    code: response.getSuccessCode(),
    message: '查询成功',
    data: {
      users: list,
    }
  }
}