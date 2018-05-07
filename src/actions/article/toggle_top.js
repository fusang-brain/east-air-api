
import {filterParams} from '../../utils/filters';

export default async function (req, params, ctx) {
  const { services, response } = ctx;
  const args = filterParams(req.body, {
    id: ['string', 'required'],
  });

  const res = await services.article.toggleTop(args.id);

  return {
    code: response.getSuccessCode('insert'),
    message: res ? '置顶成功' : '取消置顶',
  }
}
