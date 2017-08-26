/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/24
 */

import { filterParams } from '../../utils/filters'

export default async (req, params, {response, services}) => {
  const args = filterParams(req.body, {
    act_id: ['string', 'required'],
  });

  await services.activity.sign(args.act_id, req.user.dept, req.user.id);

  return {
    code: response.getSuccessCode(),
    message: '签到成功',
  }
}