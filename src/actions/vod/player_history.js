/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/28
 */

// 获取用户的历史视频
export default async (req, params, {response, services}) => {

  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;

  const {total, play_history} = await services.vod.vodHistory(req.user.id, offset, limit);

  return {
    code: response.getSuccessCode(),
    message: '历史获取成功',
    data: {
      total,
      play_history: play_history.map(_ => {
        const visiteRate = parseInt(parseInt(_.last_play_seed) / parseInt(_.duration) * 100);
        _.setDataValue('visite_rate', visiteRate);
        return _;
      }),
    }
  }
}