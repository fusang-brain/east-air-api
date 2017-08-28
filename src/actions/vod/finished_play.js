/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/28
 */
import { filterParams } from '../../utils/filters';

export default async (req, params, {response, services}) => {

  const args = filterParams(req.body, {
    vod_id: ['string', 'required']
  });

  await services.vod.finishedPlay(args.vod_id, req.user.id);

  return {
    code: response.getSuccessCode(),
    message: '已完成',
  }
}