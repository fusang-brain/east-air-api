

import {filterParams} from '../../utils/filters';
import config from '../../config';

export default async function (req, params, ctx) {
  const { services, response, models } = ctx;
  // const { kind, version } = req.query;

  const upgrade = await models.Upgrade.findOne({
    where: {
      kind: 'ios',
    },
    order: [['update_at', 'DESC']],
  });

  return (res) => {
    // res.send(str);
    // res.redirect(301, `itms-services://?action=download-manifest&url=https://gonghuidownload.mubj-fxb.com/east/ios/manifest.plist`);
    res.redirect(301, `itms-services://?action=download-manifest&url=https://${config.hostname}/upgrade/ios`);
  }

}
