

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

  let str = `<?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0">
  <dict>
    <key>items</key>
    <array>
      <dict>
        <key>assets</key>
        <array>
          <dict>
            <key>kind</key>
            <string>software-package</string>
            <key>url</key>
            <string>https://${config.hostname}/download-ipa/${upgrade.filename}</string>
          </dict>
          <dict>
            <key>kind</key>
            <string>display-image</string>
            <key>url</key>
            <string>https://${config.hostname}/file/ios-app-plist.png</string>
          </dict>
          <dict>
            <key>kind</key>
            <string>full-size-image</string>
            <key>url</key>
            <string>https://${config.hostname}/file/ios-app-plist.png</string>
          </dict>
        </array>
        <key>metadata</key>
        <dict>
          <key>bundle-identifier</key>
          <string>com.ceair.BEIunionSPEED</string>
          <key>bundle-version</key>
          <string>${upgrade.version}</string>
          <key>kind</key>
          <string>software</string>
          <key>title</key>
          <string>MU北分工会</string>
        </dict>
      </dict>
    </array>
  </dict>
  </plist>`

  // str = `<?xml version="1.0" encoding="UTF-8"?>
  // <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  // <plist version="1.0">
  // <dict>
  //   <key>items</key>
  //   <array>
  //     <dict>
  //       <key>assets</key>
  //       <array>
  //         <dict>
  //           <key>kind</key>
  //           <string>software-package</string>
  //           <key>url</key>
  //           <string>https://gonghuidownload.mubj-fxb.com/east/ios/EAunion.ipa</string>
  //         </dict>
  //         <dict>
  //           <key>kind</key>
  //           <string>display-image</string>
  //           <key>url</key>
  //           <string>https://gonghuidownload.mubj-fxb.com/east/images/ios-app-plist.png</string>
  //         </dict>
  //         <dict>
  //           <key>kind</key>
  //           <string>full-size-image</string>
  //           <key>url</key>
  //           <string>https://gonghuidownload.mubj-fxb.com/east/images/ios-app-plist.png</string>
  //         </dict>
  //       </array>
  //       <key>metadata</key>
  //       <dict>
  //         <key>bundle-identifier</key>
  //         <string>com.ceair.BEIunionSPEED</string>
  //         <key>bundle-version</key>
  //         <string>1.0.1.0</string>
  //         <key>kind</key>
  //         <string>software</string>
  //         <key>title</key>
  //         <string>MU北分工会</string>
  //       </dict>
  //     </dict>
  //   </array>
  // </dict>
  // </plist>
  // `

  return (res) => {
    res.send(str);
  }

}
