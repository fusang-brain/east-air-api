
import {filterParams} from '../../utils/filters';

export default async function (req, params, ctx) {
  const { services, response } = ctx;
  const args = filterParams(req.query, {
    // filter: ['object'],
    offset: ['string', 'required'],
    limit: ['string', 'required'],
    title: ['string'],
    date: ['string'],
    group: ['string'],
    category: ['string'],
  });

  const { offset, limit, ...filter} = args;

  const resp = await services.article.list({ offset: +offset, limit: +limit, filter });

  return {
    code: response.getSuccessCode(),
    message: '获取列表成功',
    data: resp,
  }
}
