/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/10/23
 */

import {iLog} from 'helper';
import models from '../models';
import Auth from '../utils/auth';
import Config from '../config';

import {permissions, dept, sysuser, roles, defaultImage, SurveyImages, SatisfactionSurvey} from '../config/init_data';

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
  iLog('== 开始删除旧的数据库 ==');
  await models.sequelize.getQueryInterface().dropAllTables();
  iLog('== 开始同步数据库 ==');
  await models.sequelize.sync();
  iLog('== 同步数据库成功 ==');

  iLog('== 开始创建初始数据 ==');

  iLog('* 开始生成系统初始权限');
  for (let i = 0; i < permissions.length; i ++) {
    let item = permissions[i];
    let module = await models.Module.create({
      name: item.name,
      slug: item.slug,
    });
    iLog(`  --- 写入模块 ${item.name}`);
    for (let j = 0; j < item.permission.length; j ++) {
      let perm = item.permission[j];
      await models.Permission.create({
        module_id: module.id,
        module_slug: module.slug,
        name: perm.name,
        slug: perm.slug,
      });
      iLog(`    --- 写入 ${item.name} 模块权限 ${perm.name}`);
    }
  }
  iLog('* 系统权限生成成功');

  iLog('* 创建初始工会');
  for (let i = 0; i < dept.length; i ++) {
    let deptItem = dept[i];
    let parentDept = await models.Dept.create({
      dept_name: deptItem.name,
    });
    await allDept(deptItem.children, parentDept, 2);
  }
  iLog('* 初始工会创建成功');
  let defaultRoles = {};
  iLog('* 创建角色');
  for (let i = 0; i < roles.length; i ++) {
    let role = await models.Role.create({
      role_name: roles[i].role_name,
      role_slug: roles[i].role_slug,
      role_description: roles[i].role_description,
      available: roles[i].available,
    });
    defaultRoles[role.role_slug] = role;
  }
  iLog('* 角色创建成功');

  iLog('* 创建系统管理员');
  await models.User.create({
    name: Config.migrations.super_user.name || 'root',
    mobile: Config.migrations.super_user.mobile || '13100000000',
    nickname: Config.migrations.super_user.nickname || 'root',
    birthday: new Date().getTime(),
    dept: defaultDept,
    role: defaultRoles['root'].id,
    card_num: '100000000000100000',
    password: Auth.encodePassword('C1508FB3AA5E9F4E49920A9618AA96F5DC287182'), // 'itspeed'
  });

  iLog('* 管理员创建成功');
  iLog('* 初始数据创建成功');
}

start().then(res => {
  iLog('* 数据库重置完成');
  iLog('* 键入 ctrl + c 退出安装程序')
}).catch(err => {
  console.log('======', err);
})