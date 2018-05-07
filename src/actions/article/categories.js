
import {filterParams} from '../../utils/filters';

export default async function (req, params, ctx) {
  const { services, response } = ctx;
  const args = filterParams(req.query, {
    group: ['string', 'required'],
  });

  const categories = await services.article.categories({ group: args.group });

  return {
    code: response.getSuccessCode(),
    message: '获取成功',
    data: {
      categories,
    }
  }
}
