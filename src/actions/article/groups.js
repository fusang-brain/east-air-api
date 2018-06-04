
import {filterParams} from '../../utils/filters';

/**
 * 获取所有分组
 * @param {*} req 
 * @param {*} params 
 * @param {*} ctx 
 */
export default async function (req, params, ctx) {
  const { services, response } = ctx;

  const groups = await services.article.groupList(req.user.id);

  return {
    code: response.getSuccessCode(),
    message: '获取成功',
    data: {
      groups,
    }
  }
}
