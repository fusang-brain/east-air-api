
import {filterParams} from '../../utils/filters';

/**
 * 创建分类
 * @param {*} req 
 * @param {*} params 
 * @param {*} ctx 
 */
export default async function (req, params, ctx) {
  const { services, response, checkAccess } = ctx;
  await checkAccess('article', 'category');
  const args = filterParams(req.body, {
    name: ['string', 'required'],
    kind: ['string', 'required'], // ['cate', 'group']
    group: ['string'],
    id_type: ['string'],
  });

  await services.article.createCategory(args);

  return {
    code: response.getSuccessCode('insert'),
    message: '分类创建成功',
  }
}
