
import {filterParams} from '../../utils/filters';

export default async function (req, params, ctx) {
  const { services, response } = ctx;
  const args = filterParams(req.body, {
    id: ['string', 'required'],
  });

  await services.article.removeCategory(args.id);

  return {
    code: response.getSuccessCode('insert'),
    message: '分类删除成功',
  }
}
