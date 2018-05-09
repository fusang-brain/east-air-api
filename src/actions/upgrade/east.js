

import {filterParams} from '../../utils/filters';

export default async function (req, params, ctx) {
  const { services, response, models } = ctx;
  // const { kind, version } = req.query;

  const upgradeIOS = await models.Upgrade.findOne({
    where: {
      kind: 'ios',
    },
    order: [['update_at', 'DESC']],
  });

  const upgradeANDROID = await models.Upgrade.findOne({
    where: {
      kind: 'android',
    },
    order: [['update_at', 'DESC']],
  });

  return (res) => {
    res.render('east', { ios_plist_href: `http://mubjfgsgh.mubj-fxb.com/api/upgrade/ios`, android_href: `http://mubjfgsgh.mubj-fxb.com/api/download-apk/${upgradeANDROID.filename}` })
    // res.send('=====');
  }

}
