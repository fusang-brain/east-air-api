/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/13
 */
import {filterParams} from '../../utils/filters';
import ApprovalService from '../../service/ApprovalService';
import SympathyService from '../../service/SympathyService';

export default async function (req, params, {response}) {

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
  if (!args.dept_id) {
    delete args.dept_id;
  }
  const saveType = params[0];
  const sympathyService = new SympathyService();

  if (saveType === 'submit') {
    args.state = 1;
    const approvalService = new ApprovalService();
    await approvalService.generateApproval(args.id, req.user.id, 2);
  } else if (saveType === 'draft') {
    args.state = 0;
  } else {
    return {
      code: response.getErrorCode(),
      message: '不存在的保存类型',
    }
  }

  await sympathyService.update(args);

  return {
    code: response.getSuccessCode('update'),
    message: '修改成功',
  }

}