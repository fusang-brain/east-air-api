
import config from '../../config';
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
    res.render('east', { ios_plist_href: `http://${config.hostname}/upgrade/ios`, android_href: `http://${config.hostname}/download-apk/${upgradeANDROID.filename}` })
    // res.send('=====');
  }

}
