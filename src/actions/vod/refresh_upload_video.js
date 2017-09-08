/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/26
 */
import { filterParams } from '../../utils/filters';
import { ALIYunAPI } from '../../utils/vod';
import config from '../../config';

// 刷新视频上传权鉴
export default async (req, params, {response, services}) => {
  const args = filterParams(req.body, {
    aliyun_video_id: ['string', 'required'],
  });

  const aliYunAPI = new ALIYunAPI({
    accessKeyID: config.aliyun.accessKeyID,
    accessKeySecret: config.aliyun.accessKeySecret,
  });

  const res = await aliYunAPI.refreshUploadVideo({videoID: args.aliyun_video_id});

  return {
    code: response.getSuccessCode(),
    message: '获取成功',
    data: {
      upload_auth: res.UploadAuth,
    }
  }

}