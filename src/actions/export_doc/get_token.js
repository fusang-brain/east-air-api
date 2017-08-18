/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/14
 */

const exportActions = [
  'export_statistics_sympathy',
  'export_statistics_relax_action',
]

export default async function (req, params, {response, models, checkAccess}) {
  const action = req.query.action;

  switch (action) {
    case exportActions[0]:
      await checkAccess('sympathy', 'statistics');
      break;
    case exportActions[1]:
      await checkAccess('relax_action', 'statistics');
      break;
    default:
      throw {
        code: response.getErrorCode(),
        message: '不支持的导出类型',
      }
      break;
  }
  // todo change mysql storage to redis
  const DownloadToken = models.DownloadToken;

  const token = await DownloadToken.create({
    user_id: req.user.id,
    expired_at: Date.now() + 60 * 3,
  });

  return {
    code: response.getSuccessCode(),
    message: '校验成功',
    data: {
      token: token.token,
    }
  }
}