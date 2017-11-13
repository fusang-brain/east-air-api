/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/11/11
 */

export default async function (req, params, { response, services, redisClient }) {

  // all: 全部 or id1, id2, id3
  const { ids } = req.query;
  const key = req.user.id + String(Date.now());
  redisClient.set(`EXPORT_${key}`, ids, 'EX', 60 * 60);

  return {
    code: response.getSuccessCode(),
    ref: '/vod/export_history?s=' + key,
  }
}