/**
 * Created by alixez on 17-6-22.
 */
import {filterParams} from '../../utils/filters';

export default async function (req, params, {models, response}) {

  const args = filterParams(req.body, {
    name: ['required', 'string'],
    gender: ['number', 'required'],
    birthday: ['string', 'required'],
    card_num: ['string', 'required'],
    mobile: ['string', 'required'],
    ehr: ['string', 'required'],
    dept: ['string', 'required'],
    role: ['string', 'required'],
    data_access: ['array'],
    state: ['number', 'required'],
    no: ['number', 'required'],
    type: ['number', 'required'],
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