/**
 * Created by alixez on 17-7-31.
 */

import {filterParams} from '../../utils/filters';

export default async function (req, params, {response, models}) {
  const args = filterParams(req.body, {
    avatar: ['string'],
    name: ['string'],
    gender: ['number'],
    birthday: ['string'],
    mobile: ['string'],
    jobs: ['string'],
    dept: ['string']
  });

  const User = models.User;
  await User.update(args, {
    where: {id: req.user.id}
  });

  return {
    code: response.getSuccessCode('update'),
    message: '修改成功',
  }
}