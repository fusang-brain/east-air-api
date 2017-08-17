/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/13
 */

import SympathyService from '../../service/SympathyService';
import ApprovalService from '../../service/ApprovalService';
import {filterParams} from '../../utils/filters'
export default async function (req, params, {response, device, checkAccess}) {
  await checkAccess('sympathy', 'view');
  const args = filterParams(req.query, {
    id: ['string', 'required'],
  });

  const sympathyService = new SympathyService();
  const approvalService = new ApprovalService();

  const details = await sympathyService.details(args.id);
  if (details.state === 0) {
    return {
      code: response.getSuccessCode(),
      message: '获取成功',
      data: {
        details: details,
        flows: [],
      }
    }
  }
  const approvalID = await approvalService.getApprovalIDByProjectID(args.id);
  let flows = [];
  if (approvalID) {

    flows = await approvalService.approvalFlows(approvalID);
    if (device === 'app') {
      flows = flows.sort((a, b) => {
        return b.sort - a.sort;
      });
    }
  }

  return {
    code: response.getSuccessCode(),
    message: '查询成功',
    data: {
      details,
      flows,
    }
  }
}