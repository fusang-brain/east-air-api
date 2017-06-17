/**
 * Created by alixez on 17-6-14.
 */
import models from './models';
import Auth from './utils/auth';

function log(des) {
  console.log(`[EAA] (${Date.now()}): ${des} ++`);
}

// sync database

log('========== START SYNC DATABASES ==========');
try {
  models.sequelize.sync().then(() => {
    log('========== START INIT USERINFO ==========');
    // models.User.create({
    //   name: '管理员',
    //   mobile: '18627894265',
    //   nickname: '管理员',
    //   birthday: new Date().getTime(),
    //   card_num: '--',
    //   password: Auth.encodePassword('7C4A8D09CA3762AF61E59520943DC26494F8941B'), // '1234567'
    // });
    log('========== START INIT DEPT ==========');
    // models.Dept.bulkCreate([
    //   {
    //     numKey: 1,
    //     treeLevel: 1,
    //     parent: 0,
    //     hasChildren: true,
    //     deptName: '东方航空北京分公司工会',
    //   },
    //   {
    //     num_key: 2,
    //     treeLevel: 2,
    //     parent: 1,
    //     hasChildren: false,
    //     deptName: '飞行部分会',
    //   },
    //   {
    //     num_key: 3,
    //     treeLevel: 2,
    //     parent: 1,
    //     hasChildren: false,
    //     deptName: '地服部分会',
    //   }
    // ]);

    log('========== INIT END ==========');

  });
  log('>>> Sync database successful .');
} catch (err) {
  log('>>> ): Sync database error !');
}
log('========== SYNC END ==========');
