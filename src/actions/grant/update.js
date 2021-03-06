/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/13
 */
import {filterParams} from '../../utils/filters';
import GrantApplicationService from '../../service/GrantApplicationService';
import ApprovalService from '../../service/ApprovalService';
export default async function  (req, params, {response, checkAccess, services}) {
  await checkAccess('grant_application', 'edit');
  const args = filterParams(req.body, {
    id: ['string', 'required'],
    type: ['number'],
    dept_id: ['string'],
    cost: ['number'],
    purpose: ['string'],
    people_count: ['integer'],
    others: ['string'],
    items: ['array'],
    attach: ['array'],
  });

  const saveType = params[0] || 'draft';

  if (saveType === 'draft') {
    args.state = 0;
  } else if (saveType === 'submit'){
    args.state = 1;
  } else {
    return {
      code: response.getErrorCode(),
      message: '不存在的保存类型！',
    }
  }
  if (!args.dept_id) {
    // args.dept_id = req.user.dept;
    args.dept_id = req.user.parentDept;
  }
  args.user_id = req.user.id;

  if (args.type === 7) {
    delete args.items;
  }

  const grantApplicationService  = services.grantApplication;
  const approvalService = services.approval;
  const foundGrant = await grantApplicationService.update(args);
  if (saveType === 'submit') {
    await approvalService.generateApproval(args.id, req.user.id, 3, {
      project_subject: foundGrant.type_string,
      project_type: 10,
      project_purpose: args.purpose || foundGrant.purpose,
      project_content: args.purpose || foundGrant.purpose,
      dept_id: args.dept_id || foundGrant.dept_id,
      total_amount: args.cost || foundGrant.cost,
      has_grant: true,
    });
  }

  return {
    code: response.getSuccessCode('update'),
    message: '修改成功',
  }
}