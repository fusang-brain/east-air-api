/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/13
 */
import {filterParams} from '../../utils/filters';
import ApprovalService from '../../service/ApprovalService';
import SympathyService from '../../service/SympathyService';

export default async function (req, params, {response, checkAccess, services}) {
  await checkAccess('sympathy', 'edit');
  const args = filterParams(req.body, {
    id: ['string', 'required'],
    reason: 'string',
    person: 'string',
    dept_id: 'string',
    sympathy_date: 'string',
    sympathy_cost: 'number',
    sympathy_good_cost: 'number',
    sympathy_type: 'integer',
    person_num: 'integer',
  });
  // todo check is can't update


  if (!args.dept_id) {
    delete args.dept_id;
  }
  const saveType = params[0];
  const sympathyService = services.sympathy;

  if (saveType === 'submit') {
    args.state = 1;
  } else if (saveType === 'draft') {
    args.state = 0;
  } else {
    return {
      code: response.getErrorCode(),
      message: '不存在的保存类型',
    }
  }

  const foundSympathy = await sympathyService.update(args);

  if (args.state === 1) {
    const approvalService = services.approval;
    await approvalService.generateApproval(args.id, req.user.id, 2, {
      project_subject: args.reason || foundSympathy.reason,
      project_type: 9,
      project_content: args.reason || foundSympathy.reason,
      project_purpose: args.reason || foundSympathy.reason,
      dept_id: args.dept_id || foundSympathy.dept_id,
      total_amount: args.sympathy_cost || foundSympathy.sympathy_cost,
      has_grant: true,
    });
  }

  return {
    code: response.getSuccessCode('update'),
    message: '修改成功',
  }

}