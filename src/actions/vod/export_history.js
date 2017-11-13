/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/11/11
 */

import xlsx from 'node-xlsx';
import config from '../../config';
import moment from 'moment';

export default async function (req, params, { response, services, redisClient }) {
  const { s } = req.query;
  let ids = null;
  let idsCached = await redisClient.getAsync(`EXPORT_${s}`);
  if (!idsCached) {
    return 'Not Found!'
  }
  console.log(idsCached);
  if (idsCached !== 'all') {
    ids = idsCached.split(',');
  }
  const data = await services.vod.getExportData({ ids });

  const exportData = [];
  data.forEach(_ => {
    let rows = [];
    _.users.forEach(user => {
      rows.push([user.name, user.mobile, user.card_num, user.ehr, ['未知', '女', '男'][user.gender], user.no]);
    });
    rows.unshift(['姓名', '手机', '身份证', 'EHR', '性别', '卡号']);
    rows.unshift(['培训类型', `${['视频', '音频'][_.vod_type]}/${config.vod_category[_.category]}`])
    rows.unshift(['培训标题:', _.title]);
    exportData.push({
      name: '培训' + _.title + String(Date.now()),
      data: rows,
    })
  });
  const buffer = xlsx.build(exportData);
  let filename = moment().format('YYYYMMDDHHmmss');

  return res => {
    res.set('Content-Disposition', `attachment; filename=${filename}.xlsx`);
    res.send(buffer);
  }
}