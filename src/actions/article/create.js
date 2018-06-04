
import {filterParams} from '../../utils/filters';

/**
 * 创建文章
 * @param {*} req 
 * @param {*} params 
 * @param {*} ctx 
 */
export default async function (req, params, ctx) {
  const { services, response, checkAccess } = ctx;
  await checkAccess('article', 'create');
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
