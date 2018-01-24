/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/24
 */

import { filterParams } from '../../utils/filters'

/**
 * 活动签到
 * @param req HttpRequest object
 * @param params Request params
 * @param response Response class
 * @param models Mapper of models
 * @param device The device of user
 * @param services Mapper of services
 * @returns Object Response Object
 */
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