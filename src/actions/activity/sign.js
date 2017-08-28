/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/24
 */

import { filterParams } from '../../utils/filters'

export default async (req, params, {response, models, services}) => {
  const args = filterParams(req.body, {
    act_id: ['string', 'required'],
  });

  const {hasSigned, ...integrationInfo} = await services.activity.sign(args.act_id, req.user.dept, req.user.id);

  if (hasSigned) {
    return {
      code: response.getErrorCode(),
      message: '请勿重复签到',
    }
  }
  return {
    code: response.getSuccessCode(),
    message: hasSigned ? '请勿重复签到' : '签到成功',
    data: {
      integration_info: integrationInfo,
    }
  }
}