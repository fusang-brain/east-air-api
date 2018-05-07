/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/26
 */

import { ALIYunAPI } from '../../utils/vod';
import { filterParams } from '../../utils/filters';
import config from '../../config';

// 获取阿里云视频上传地址
export default async (req, params, {response, models, services}) => {

  const args = filterParams(req.body, {
    title: ['string', 'required'],
    filename: ['string', 'required'],
    filesize: ['integer', 'required'],
  });

  const aliYunAPI = new ALIYunAPI({
    accessKeyID: config.aliyun.accessKeyID,
    accessKeySecret: config.aliyun.accessKeySecret,
  });

  const res = await aliYunAPI.createUploadVideo({
    title: args.title,
    filename: args.filename,
    filesize: args.filesize,
  });

  await models.Video.create({
    id: res.VideoId,
  });

  return {
    code: response.getSuccessCode(),
    message: '获取成功',
    data: {
      // upload_auth: res,
      upload_address: res.UploadAddress,
      aliyun_video_id: res.VideoId,
      upload_auth: res.UploadAuth,
    }
  }
}