/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/10/24
 */

import {iLog} from 'helper';
import models from '../models';
import Auth from '../utils/auth';
import Config from '../config';

import {sysuser} from '../config/init_data';

async function start () {
  iLog('* 创建系统管理员');

  const defaultDept = await models.Dept.findOne();
  const rootRole = await models.Role.findOne({
    where: {
      role_slug: 'root',
    }
  });

  if (!rootRole || !defaultDept) {
    throw new Error("没有找到应该存在的角色和部门，请您执行 npm run db:reinstall 命令");
  }

  await models.users.destroy({
    where: {
      role: rootRole.id,
    }
  });

  await models.User.create({
    name: Config.migrations.super_user.name || 'root',
    mobile: Config.migrations.super_user.mobile || '13100000000',
    nickname: Config.migrations.super_user.nickname || 'root',
    birthday: Date.now(),
    dept: defaultDept.id,
    role: rootRole.id,
    card_num: '100000000000100000',
    password: Auth.encodePassword('C1508FB3AA5E9F4E49920A9618AA96F5DC287182'), // 'itspeed'
  });

  iLog('* 管理员创建成功');
}

start().then(() => {
  iLog('* 超级用户创建成功');
  iLog('* 若未退出，键入 ctrl + c 退出');
  process.exit();
}).catch((err) => {
  console.log(err);
  process.exit(1);
})