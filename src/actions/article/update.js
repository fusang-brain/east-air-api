
import {filterParams} from '../../utils/filters';

/**
 * 修改动态
 * @param {*} req 
 * @param {*} params 
 * @param {*} ctx 
 */
export default async function (req, params, ctx) {
  const { services, response, checkAccess } = ctx;
  await checkAccess('article', 'edit');
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
