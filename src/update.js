/**
 * Created by alixez on 17-6-14.
 */
import models from './models';
import Auth from './utils/auth';
import {permissions, dept, sysuser, roles, defaultImage, SurveyImages, SatisfactionSurvey} from './config/init_data';

const userTotal = 10;

function log(des) {
  console.log(`[EAA] (${Date.now()}): ++ ${des} ++`);
}
let defaultDept = null;
async function allDept(children, parent, level) {
  for (let i =0; i < children.length; i ++) {
    let deptItem = children[i];
    let p = await models.Dept.create({
      tree_level: level,
      parent: parent.id,
      dept_name: deptItem.name,
    });
    if (level === 3) {
      defaultDept = p.id;
    }
    if (deptItem.children) {
      await allDept(deptItem.children, p, level + 1);
    }
    log('OK');
  }
}

async function start() {
  // log('== 开始删除数据库 ==');
  // await models.sequelize.getQueryInterface().dropAllTables();
  log('== 开始同步数据库 ==');
  await models.sequelize.sync();
  log('== 同步数据库成功 ==');
}

start().then(res => {
  log('== 系统更新完成 ==');
  log('== 键入 ctrl + c 退出安装程序 ==');
}).catch(err => {
  console.log('======', err);
});