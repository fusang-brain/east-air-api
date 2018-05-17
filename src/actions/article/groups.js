
import {filterParams} from '../../utils/filters';

export default async function (req, params, ctx) {
  const { services, response } = ctx;

  const groups = await services.article.groupList(req.user.id);

  return {
    code: response.getSuccessCode(),
    message: '获取成功',
    data: {
      groups,
    }
  }
}
