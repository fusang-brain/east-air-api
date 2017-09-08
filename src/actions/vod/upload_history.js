/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/28
 */

import { filterParams } from '../../utils/filters'

// 更新视频播放历史
export default async (req, params, {response, services}) => {

  const args = filterParams(req.body, {
    vod_id: ['string', 'required'],
    last_play_seed: 'string',
  });

  args.user_id = req.user.id;

  await services.vod.uploadVodHistory(args);

  return {
    code: response.getSuccessCode(),
    message: '历史上传成功',
  }
}