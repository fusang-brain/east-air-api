
import SympathyService from '../../service/SympathyService';
import ApprovalService from '../../service/ApprovalService';
import {filterParams} from "../../utils/filters"
import Decimal from 'decimal.js';

const sympathyService = new SympathyService();

export default async function (req, params, {response}) {

  const args = filterParams(req.body, {
    reason: ['string', 'required'],
    person: ['string', 'required'],
    dept_id: ['string'],
    sympathy_date: ['string', 'required'],
    sympathy_cost: ['number', 'required'],
    sympathy_good_cost: ['number', 'required'],
    sympathy_type: ['integer', 'required'],
    person_num: ['integer', 'required']
  });

  if (!args.dept_id) {
    args.dept_id = req.user.dept;
  }

  args.user_id = req.user.id;

  const state = params[0] || 'draft';
  if (state === 'draft') {
    args.state = 0;
  } else if (state === 'submit') {
    args.state = 1;
}

  const createdSympathy = await sympathyService.create(args);

  if (args.state === 1) {
    const approvalService = new ApprovalService();
    await approvalService.generateApproval(createdSympathy.id, req.user.id, 2, {
      project_subject: createdSympathy.reason,
      project_type: 9,
      dept_id: createdSympathy.dept_id,
      total_amount: createdSympathy.sympathy_cost,
      has_grant: true,
    });
  }

  return {
    code: response.getSuccessCode('create'),
    message: '创建成功',
    data: {
      sympathy: createdSympathy,
    }
  }
}