/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/13
 */
import {filterParams} from '../../utils/filters';
import ApprovalService from '../../service/ApprovalService';
import GrantApplicationService from '../../service/GrantApplicationService';

export default async function  (req, params, {response, device, checkAccess}) {
  await checkAccess('grant_application', 'view');
  const args = filterParams(req.query, {
    id: ['string', 'required'],
  });

  const approvalService = new ApprovalService();
  const grantApplicationService = new GrantApplicationService();

  const details =  await grantApplicationService.details(args.id);

  if (details.state === 0) {
    return {
      code: response.getSuccessCode(),
      message: '查询成功',
      data: {
        details,
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
    message: '获取成功',
    data: {
      details,
      flows,
    }
  }
}