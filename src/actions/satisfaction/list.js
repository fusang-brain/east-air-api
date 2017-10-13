/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/23
 */

export default async (req, params, {response, services}) => {

  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;

  const {list, total} = await services.satisfaction.generateSiteList({limit, offset});

  return {
    code: response.getSuccessCode(),
    message: '获取成功',
    data: {
      list,
      total,
    }
  }
}