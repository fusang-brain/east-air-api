
import SympathyService from '../../service/SympathyService';
import ApprovalService from '../../service/ApprovalService';
import {filterParams} from "../../utils/filters"

const sympathyService = new SympathyService();

export default async function (req, params, {response}) {

  const args = filterParams(req.body, {
    reason: ['string', 'required'],
    person: ['string', 'required'],
    dept_id: ['string', 'required'],
    sympathy_date: ['string', 'required'],
    sympathy_cost: ['string', 'required'],
    sympathy_good_cost: ['string', 'required'],
    sympathy_type: ['integer', 'required'],
    person_num: ['integer', 'required']
  });

  if (!args.dept_id) {
    args.dept_id = req.user.dept;
  }

  args.user_id = req.user.id;

  const createdSympathy = await sympathyService.create(args);
  const approvalService = new ApprovalService();
  await approvalService.generateActApproval(createdSympathy.id, req.user.id);

  return {
    code: response.getSuccessCode('create'),
    message: '创建成功',
    data: {
      sympathy: createdSympathy,
    }
  }
}