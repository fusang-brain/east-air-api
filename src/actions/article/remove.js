
import {filterParams} from '../../utils/filters';

export default async function (req, params, ctx) {
  const { services, response, checkAccess } = ctx;
  await checkAccess('article', 'deleted');
  const args = filterParams(req.body, {
    id: ['string', 'required'],
  });

  const res = await services.article.remove(args.id);

  return {
    code: response.getSuccessCode('remove'),
    message: '移除成功',
  }
}
