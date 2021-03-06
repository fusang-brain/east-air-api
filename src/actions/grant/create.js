/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/13
 */
import {filterParams} from '../../utils/filters';
import GrantApplicationService from '../../service/GrantApplicationService';
import ApprovalService from '../../service/ApprovalService';

export default async function  (req, params, {response, checkAccess, services}) {
  await checkAccess('grant_application', 'create');
  const args = filterParams(req.body, {
    type: ['integer', 'required'],
    dept_id: ['string'],
    cost: ['number', 'required'],
    purpose: ['string', 'required'],
    people_count: ['integer', 'required'],
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
  const grantApplicationService = services.grantApplication;
  const approvalService = services.approval;
  if (!args.dept_id) {
    args.dept_id = req.user.dept;
  }
  args.user_id = req.user.id;

  if (args.type !== 2) {
    delete args.items;
  }

  const createdGrant = await grantApplicationService.create(args);
  if (saveType === 'submit') {
    await approvalService.generateApproval(createdGrant.id, req.user.id, 3, {
      project_subject: createdGrant.type_string,
      project_type: 10,
      project_purpose: createdGrant.purpose,
      project_content: createdGrant.purpose,
      dept_id: createdGrant.dept_id,
      total_amount: createdGrant.cost,
      has_grant: true,
    });
  }

  return {
    code: response.getSuccessCode('create'),
    message: '创建成功',
    data: {
      grant_apply: createdGrant,
    }
  }
}