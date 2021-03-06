/**
 * Created by alixez on 17-8-9.
 */


export default async function (req, params, {response, models}) {
  // todo change mysql storage to redis

  const DownloadToken = models.DownloadToken;

  const token = await DownloadToken.create({
    expired_at: Date.now() + 60 * 3,
  });

  // console.log(token);

  return {
    code: response.getSuccessCode(),
    message: '校验成功',
    data: {
      token: token.token,
    }
  }
}