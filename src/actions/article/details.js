
import {filterParams} from '../../utils/filters';

export default async function (req, params, ctx) {
  const { services, response } = ctx;
  const args = filterParams(req.query, {
    id: ['string', 'required'],
  });

  const details = await services.article.details(args.id);

  return {
    code: response.getSuccessCode(),
    message: '获取成功',
    data: {
      details,
    }
  }
}
