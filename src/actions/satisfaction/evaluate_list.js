/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/25
 */
import { filterParams } from '../../utils/filters'

export default async (req, params, {response, services}) => {

  const args = filterParams(req.query, {
    id: ['string', 'required'],
  });

  args.offset = parseInt(req.query.offset) || 0;
  args.limit = parseInt(req.query.limit) || 20;

  const {list, total} = await services.satisfaction.evaluateList(args);

  return {
    code: response.getSuccessCode(),
    message: '查询成功',
    data: {
      list,
      total,
    }
  }

}