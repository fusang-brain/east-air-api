
import {filterParams} from '../../utils/filters';

export default async function (req, params, ctx) {
  const { services, response } = ctx;
  const args = filterParams(req.body, {
    title: ['string', 'required'],
    category: ['string', 'required'],
    groupID: ['string', 'required'],
    description: ['string', 'required'],
    content: ['string', 'keep'],
    videos: ['array', 'keep'],
  });

  const article = await services.article.create(args, req.user.id);

  return {
    code: response.getSuccessCode('insert'),
    message: '发布成功',
    data: {
      article,
    }
  }
}
