/**
 * Created by alixez on 17-8-3.
 */

import {ApprovalService} from '../../service';

/**
 * 获取审批流程模板
 * @param req HttpRequest object
 * @param params HttpRequest params
 * @param response Response object
 * @returns {Promise.<{code: *, message: string, data: {temp: *}}>} The API response object
 */
export default async function (req, params, {response}) {

  const approvalService = new ApprovalService();

  // 获取审批流程模板
  const temp = await approvalService.generateApprovalFlowTemp(req.user.id);

  return {
    code: response.getSuccessCode(),
    message: '查看成功',
    data: {
      temp: temp,
    }
  }
}