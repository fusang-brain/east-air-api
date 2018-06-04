
import {filterParams} from '../../utils/filters';

/**
 * 删除动态分类
 * @param {*} req 
 * @param {*} params 
 * @param {*} ctx 
 */
export default async function (req, params, ctx) {
  const { services, response, checkAccess } = ctx;
  await checkAccess('article', 'category');
  const args = filterParams(req.body, {
    id: ['string', 'required'],
  });

  await services.article.removeCategory(args.id);

  return {
    code: response.getSuccessCode('insert'),
    message: '分类删除成功',
  }
}
