/**
 * Created by alixez on 17-6-14.
 */
import models from './models';
import Auth from './utils/auth';
import {permissions, dept, sysuser, roles} from './config/init_data';

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
      dept_name:
      deptItem.name,
    });
    if (level === 4) {
      defaultDept = p.id;
    }
    if (deptItem.children) {
      await allDept(deptItem.children, p, level + 1);
    }
    log('OK');
  }
}

async function start() {
  log('== 开始删除数据库 ==');
  await models.sequelize.getQueryInterface().dropAllTables();
  log('== 开始同步数据库 ==');
  await models.sequelize.sync();
  log('== 同步数据库成功 ==');
  log('== 开始创建初始数据 ==');
  log('>> 创建系统管理员 >>');
  await models.User.create({
    name: 'root',
    mobile: '18627894265',
    nickname: 'root',
    birthday: new Date().getTime(),
    card_num: '--',
    password: Auth.encodePassword('C1508FB3AA5E9F4E49920A9618AA96F5DC287182'), // 'itspeed'
  });
  log('>> 管理员创建成功 >>');

  log('>> 开始生成系统初始权限 >>');
  for (let i = 0; i < permissions.length; i ++) {
    let item = permissions[i];
    let module = await models.Module.create({
      name: item.name,
      slug: item.slug,
    });
    log(`--- 写入模块 ${item.name}`);
    for (let j = 0; j < item.permission.length; j ++) {
      let perm = item.permission[j];
      await models.Permission.create({
        module_id: module.id,
        name: perm.name,
        slug: perm.slug,
      });
      log(`--- 写入 ${item.name} 模块权限 ${perm.name}`);
    }
  }
  log('>> 系统权限生成成功 >>');

  log('>> 创建初始工会 >>');
  for (let i = 0; i < dept.length; i ++) {
    let deptItem = dept[i];
    let parentDept = await models.Dept.create({
      dept_name: deptItem.name,
    });
    await allDept(deptItem.children, parentDept, 2);
  }
  log('>> 初始工会创建成功 >>');
  let defaultRole = null;
  log('>> 创建角色 >>');
  for (let i = 0; i < roles.length; i ++) {
    defaultRole = await models.Role.create({
      role_name: roles[i].role_name,
      role_description: roles[i].role_description,
    });
  }
  log('>> 角色创建成功');

  log('>> 批量生成用户 >>');
  for (let i = 0; i < userTotal; i ++) {
    sysuser.mobile = (String) (15500000000 + i);
    sysuser.dept = defaultDept;
    sysuser.role = defaultRole.id;
    let user = await models.User.create(sysuser);
  }
  log('>> 批量生成用户成功 >>');

  log('== 初始数据创建成功 ==');
  log('== 系统安装完成 ==');
  log('== 键入 ctrl + c 退出安装程序 ==');
}

try {
  start();
} catch (error) {
  console.log('======', error);
}