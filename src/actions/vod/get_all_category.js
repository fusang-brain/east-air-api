/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/11/9
 */

import config from '../../config';

export default async (req, params, context) => {
  return {
    code: context.response.getSuccessCode(),
    message: '分类获取成功',
    data: {
      categories: config.vod_category,
    }
  }
}