/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/28
 */
import { filterParams } from '../../utils/filters';
import { ALIYunAPI} from '../../utils/vod';

// 获取视频详情
export default async (req, params, {response, services, device}) => {
  const args = filterParams(req.query, {
    id: ['string', 'required'],
  });
  const details = await services.vod.details(args.id, device);
  const lastHistory = await services.vod.lastPlayHistory(details.id, req.user.id);
  details.setDataValue('last_play_seed', '0');
  details.setDataValue('max_play_seed', '0');
  if (lastHistory) {
    details.setDataValue('last_play_seed', lastHistory.last_play_seed);
    details.setDataValue('max_play_seed', lastHistory.max_play_seed);
  }


  return {
    code: response.getSuccessCode(),
    message: '获取成功',
    data: {
      details,
    }
  }
}