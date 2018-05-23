
import {filterParams} from '../../utils/filters';

export default async function (req, params, ctx) {
  const { services, response, device, checkAccess } = ctx;
  await checkAccess('article', 'view');
  const args = filterParams(req.query, {
    // filter: ['object'],
    offset: ['string', 'required'],
    limit: ['string', 'required'],
    title: ['string'],
    date: ['string'],
    start: ['string'],
    end: ['string'],
    group: ['string'],
    category: ['string'],
  });

  const { offset, limit, ...filter} = args;

  const resp = await services.article.list({ offset: +offset, limit: +limit, filter }, req.user.id, device);

  return {
    code: response.getSuccessCode(),
    message: '获取列表成功',
    data: resp,
  }
}
