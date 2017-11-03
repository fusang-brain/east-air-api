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
import { dept } from '../config/init_data'

async function start () {
  iLog("* 开始导入用户")

  const workSheetsFromFile = xlsx.parse(`${__dirname}/user.xlsx`);
  const sheetData = workSheetsFromFile[0].data;
  let total = 0;

  const Depts = await models.Dept.all();
  const Roles = await models.Role.all();
  const deptMapper = {};
  const roleMapper = {};

  Depts.forEach(item => {
    deptMapper[item.dept_name] = item;
  });

  Roles.forEach(item => {
    roleMapper[item.role_name] = item;
  });

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
      dept: deptMapper[data[8]] ? deptMapper[data[8]].id : '',
      role: roleMapper[data[9]] ? deptMapper[data[9]].id : '',
      qq: data[10],
      wechat: data[11],
      degree: data[12],
      duties: data[13],
      jobs: data[14],
      exist_job_level: data[15],
      now_job_level: data[16],
      start_work_time: moment(data[17]).valueOf(),
      join_time: moment(data[18]).valueOf(),
      integration: data[19],
      mark: data[20],

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