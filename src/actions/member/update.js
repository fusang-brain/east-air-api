/**
 * Created by alixez on 17-7-26.
 */

import Auth from '../../utils/auth';
import sha1 from 'crypto-js/sha1';
import {filterParams} from '../../utils/filters';

export default async function (req, params, {models, response}) {
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