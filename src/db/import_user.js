/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/10/31
 */

import {iLog} from './helper';
import models from '../models';
import xlsx from 'node-xlsx';
import moment from 'moment';
import Auth from '../utils/auth'

async function start () {
  iLog("* 开始导入用户")

  const workSheetsFromFile = xlsx.parse(`${__dirname}/user.xlsx`);
  const sheetData = workSheetsFromFile[0].data;
  let total = 0;

  for (let i = 0; i < sheetData.length; i ++) {
    let data = sheetData[i];
    if (i === 0 ) {
      continue;
    }

    let user = await models.User.create({
      name: data[0],
      mobile: data[1],
      birthday: moment(data[2]).valueOf(),
      password: Auth.encodePassword('05B530AD0FB56286FE051D5F8BE5B8453F1CD93F'), // 88888888
      card_num: data[3],
      ehr: data[4],
      state: data[5],
      no: data[6],
      type: data[7],
      qq: data[8],
      wechat: data[9],
      degree: data[10],
      duties: data[11],
      jobs: data[12],
      exist_job_level: data[13],
      now_job_level: data[14],
      start_work_time: moment(data[15]).valueOf(),
      join_time: moment(data[16]).valueOf(),
      integration: data[17],
      mark: data[18],
    });

    if (user) {
      iLog(`  -- 新增用户 ${data[0]} 成功`);
      total += 1;
    }

  }
  // console.log(workSheetsFromFile);
  iLog(`* 用户导入成功 共遍历 ${sheetData.length - 1} 条数据，成功处理 ${total} 条数据`);
}

start().then(err => {
  // console.log(err);
  process.exit();
}).catch(b => {
  console.log(b);
  process.exit(1);
})