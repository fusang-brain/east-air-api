/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/28
 */

import { filterParams } from '../../utils/filters';

// 最近一次的视频播放记录
export default async (req, params, {response, services}) => {
  const args = filterParams(req.body, {
    vod_id: ['string', 'required']
  });

  const lastHistory = await services.vod.lastPlayHistory(args.vod_id, req.user.id);

  return {
    code: response.getSuccessCode(),
    message: '获取成功',
    data: {
      last_play_history: lastHistory,
    }
  }
}