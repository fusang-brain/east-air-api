/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/26
 */
import { filterParams } from '../../utils/filters'
import VodService from '../../service/VodService'

export default async (req, params, {response, services}) => {

  const args = filterParams(req.body, {
    title: ['string', 'required'],
    vod_type: ['integer', 'required'],
    category: ['integer', 'required'],
    description: ['string', 'required'],
    cover_id: ['string', 'required'],
    aliyun_video_id: ['string', 'required'],
  });

  const createdVod = await services.vod.create(args, VodService.CREATE_LEVEL_FULL);

  return {
    code: response.getSuccessCode(),
    message: '记录上传成功',
    data: {
      created_vod: createdVod,
    }
  }
}