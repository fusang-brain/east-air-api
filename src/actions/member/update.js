/**
 * Created by alixez on 17-7-26.
 */

import Auth from '../../utils/auth';
import sha1 from 'crypto-js/sha1';
import {filterParams} from '../../utils/filters';
import {DeptService, RoleService} from '../../service';

export default async function (req, params, {models, response}) {
  const deptService = new DeptService();
  const roleService = new RoleService();
  const args = filterParams(req.body, {
    user: ['string', 'required'],
    name: ['string'],
    gender: ['number'],
    birthday: ['string'],
    card_num: ['string'],
    mobile: ['string'],
    ehr: ['string'],
    dept: ['string'],
    role: ['string'],
    data_access: ['array'],
    state: ['number'],
    no: ['number'],
    type: ['number'],
    qq: ['string'],
    wechat: ['string'],
    degree: ['number'],
    duties: ['string'],
    jobs: ['string'],
    exist_job_level: ['string'],
    now_job_level: ['string'],
    start_work_time: ['string'],
    join_time: 'string',
    integration: 'number',
    mark: 'string',
  });
  if (!await deptService.checkIsAvailableDept(args.dept)) {
    return {
      code: response.getErrorCode(),
      message: '请选择正确的部门',
    }
  }
  await roleService.checkIsGoodRole(args.role, args.dept);
  const values = {...args};
  const User = models.User;
  delete values.user;
  await User.update(values, {
    where: {id: args.user}
  });

  await models.DataAccess.destroy({
    where: {
      user_id: args.user,
    }
  });
  const dataAccess = values.data_access.map(loop => ({
    user_id: args.user,
    dept_id: loop,
  }));
  await models.DataAccess.bulkCreate(dataAccess);

  return {
    code: response.getSuccessCode('update'),
    message: '修改成功',
  }
}