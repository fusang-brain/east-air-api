/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/11/20
 */

import {iLog} from './helper';
import models from '../models';

const excludeArgs = [
  'sequelize',
  'Sequelize',
  'User',
  'Role',
  'RolePermission',
  'Permission',
  'Module',
  'Dept',
  'DataAccess',
]

async function start () {

  for (let i in models) {
    if (!excludeArgs.includes(i)) {
      iLog(`清空业务表 - ${i}`);
      await models[i].destroy({
        where: {},
      });
    };
  }

  iLog('^ 处理完成 ');
}

start().then(
  res => {
    process.exit();
  }
).catch(err => {
  console.log(err);
  process.exit(1);
})