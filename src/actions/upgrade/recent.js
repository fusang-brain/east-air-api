

import {filterParams} from '../../utils/filters';
import config from '../../config';

export default async function (req, params, ctx) {
  const { services, response, models } = ctx;
  // const { kind, version } = req.query;
  const { kind } = req.query;

  const upgrade = await models.Upgrade.findOne({
    where: {
      kind,
    },
    order: [['update_at', 'DESC']],
  });
  
  // if (!req.package) {
  //   return {
  //     code: response.getErrorCode(),
  //     message: '参数错误',
  //   }
  // }
  // const file = req.package;
  // const UpgradeModel = models.Upgrade;
  // let fileObj = await models.File.create({
  //   filename: file.filename,
  //   abs_path: file.path,
  //   path: `${config.storage.pathFolder}/${file.filename}`,
  //   mimetype: file.mimetype,
  //   size: file.size,
  //   origin_filename: file.originalname,
  // });
  // await UpgradeModel.create({
  //   version,
  //   kind,
  //   filename: file.filename,
  // });
  
  // const args = filterParams(req.body, {
  //   title: ['string', 'required'],
  //   category: ['string', 'required'],
  //   groupID: ['string', 'required'],
  //   description: ['string', 'required'],
  //   content: ['string', 'keep'],
  //   videos: ['array', 'keep'],
  // });

  // const article = await services.article.create(args, req.user.id);
  if (kind === "android") {
    upgrade.filename = `http://${config.hostname}/download-apk/${upgrade.filename}`;
  }
  if (kind === "ios") {
    // upgrade.filename = `/download-ios/${upgrade.filename}`;
    // upgrade.filename = `itms-services://?action=download-manifest&url=http://${config.hostname}/upgrade/ios`
    // upgrade.filename = `itms-services://?action=download-manifest&url=https://gonghuidownload.mubj-fxb.com/east/ios/manifest.plist`;
    upgrade.filename = `http://${config.hostname}/upgrade/update_ios`;
  }
  return {
    code: response.getSuccessCode(),
    message: '获取成功',
    data: upgrade,
  }

}
