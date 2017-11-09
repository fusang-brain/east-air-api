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
    try {
      let user = await models.User.create({
        name: data[0],
        mobile: data[1],
        gender: data[2],
        birthday: new Date(data[3]).getTime(),
        password: Auth.encodePassword('05B530AD0FB56286FE051D5F8BE5B8453F1CD93F'), // 88888888
        card_num: data[4],
        ehr: data[5],
        state: data[6],
        no: data[7],
        type: data[8],
        dept: deptMapper[data[9]] ? deptMapper[data[9]].id : '',
        role: roleMapper[data[10]] ? roleMapper[data[10]].id : '',
        qq: data[11],
        wechat: data[12],
        degree: data[13],
        duties: data[14],
        jobs: data[15],
        exist_job_level: data[16],
        now_job_level: data[17],
        start_work_time: new Date(data[18]).getTime(),
        join_time: new Date(data[19]).getTime(),
        integration: data[20],
        mark: data[21],
      });

      if (deptMapper[data[9]] && user) {
        await models.DataAccess.create({
          user_id: user.id,
          dept_id: deptMapper[data[9]].id,
        });
      }

      if (user) {
        iLog(`  -- 新增用户 ${data[0]} 成功`);
        total += 1;
      }

    } catch (err) {
      // console.log(err);
      iLog(`  -- 导入用户 ${data[0]} 出现异常 @ ${err.errors[0].message}`);
    }
  }
  // console.log(workSheetsFromFile);
  iLog(`* 用户导入成功 共遍历 ${sheetData.length - 1} 条数据，成功处理 ${total} 条数据`);
}

start().then(err => {
  // console.log(err);
  process.exit();
}).catch(b => {
  // console.log(b);
  process.exit(1);
})