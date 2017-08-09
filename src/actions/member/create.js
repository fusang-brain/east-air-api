/**
 * Created by alixez on 17-6-17.
 */
import Auth from '../../utils/auth';
import sha1 from 'crypto-js/sha1';
import {filterParams} from '../../utils/filters';
import {DeptService, RoleService} from '../../service';

export default async function (req, params, {models, response}) {
  const deptService = new DeptService();
  const roleService = new RoleService();
  const args = filterParams(req.body, {
    name: ['required', 'string'],
    gender: ['integer', 'required'],
    birthday: ['string', 'required'],
    card_num: ['string', 'required'],
    mobile: ['string', 'required'],
    ehr: ['string', 'required'],
    dept: ['string', 'required'],
    role: ['string', 'required'],
    data_access: ['array'],
    state: ['integer', 'required'],
    no: ['integer', 'required'],
    type: ['integer', 'required'],
    qq: ['string'],
    wechat: ['string'],
    degree: ['integer'],
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
  const pwd = sha1(args.card_num.substring(args.card_num.length - 6)).toString().toUpperCase();
  args.password = Auth.encodePassword(pwd);
  const User = models.User;
  if (!Array.isArray(args.data_access)) {
    args.data_access = [args.dept]
  }
  const userCount = await User.count({
    where: {
      mobile: args.mobile,
    }
  });
  if (userCount > 0 ) {
    return {
      code: response.getErrorCode('insert'),
      message: '该手机号已经存在',
    }
  }
  const createdUser = await User.create(args);
  await createdUser.setData_access(args.data_access);
  return {
    code: response.getSuccessCode('insert'),
    message: '创建成功',
    data: {
      created_user: createdUser,
    }
  }
}