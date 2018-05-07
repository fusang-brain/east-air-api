
import {filterParams} from '../../utils/filters';

export default async function (req, params, ctx) {
  const { services, response } = ctx;
  const args = filterParams(req.body, {
    id: ['string', 'required'],
    title: ['string', 'required'],
    category: ['string', 'required'],
    groupID: ['string', 'required'],
    description: ['string', 'required'],
    content: ['string', 'keep'],
    videos: ['array', 'keep'],
  });

  await services.article.update(args.id, args);

  return {
    code: response.getSuccessCode('update'),
    message: '修改成功',
  }
}
