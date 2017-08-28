/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/28
 */
import { filterParams } from '../../utils/filters'

export default async (req, params, {response, services}) => {
  const args = filterParams(req.query, {
    id: ['string', 'required'],
  });

  const details = await services.vod.details(args.id);

  return {
    code: response.getSuccessCode(),
    message: '获取成功',
    data: {
      details,
    }
  }
}