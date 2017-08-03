/**
 * Created by alixez on 17-8-2.
 */
import ApprovalService from '../../service/ApprovalService';

export default async function (req) {
  const approvalService = new ApprovalService();
  const approvalFlow = await approvalService.generateActApproval('6bb686c5-bc7d-437c-9920-a6ae0c1085ac', '822853aa-e21b-42a2-805f-801a30402b64');

  console.log(approvalFlow);
  return {
    code: 1000,
    message: '===aaa==='
  }
}