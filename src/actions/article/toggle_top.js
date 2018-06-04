
import {filterParams} from '../../utils/filters';

/**
 * 切换置顶状态
 * @param {*} req 
 * @param {*} params 
 * @param {*} ctx 
 */
export default async function (req, params, ctx) {
  
  const { services, response, checkAccess } = ctx;
  await checkAccess('article', 'top');
  const args = filterParams(req.body, {
    id: ['string', 'required'],
  });

  const res = await services.article.toggleTop(args.id);

  return {
    code: response.getSuccessCode('insert'),
    message: res ? '置顶成功' : '取消置顶',
  }
}
