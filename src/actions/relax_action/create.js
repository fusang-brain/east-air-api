/**
 * Created by alixez on 17-8-10.
 */
import RelaxActionService from '../../service/RelaxActionService';
import DeptService from '../../service/DeptService';
import {filterParams} from '../../utils/filters';
import moment from 'moment';

const relaxActionService = new RelaxActionService();
const deptService = new DeptService();

export default async function (req, params, {response, device}) {
  const args = filterParams(req.body, {
    title: ['string', 'required'],
    action_type: ['integer', 'required'],
    per_capita_budget: ['number', 'required'],
    days: ['integer', 'required'],
    date: ['string', 'required'],
    place: ['string', 'required'],
    dept_id: ['string'],
    people: ['array', 'required'],
  });

  if (!args.dept_id) {
    args.dept_id = req.user.dept;
  }

  if (!await deptService.checkIsAvailableDept(args.dept_id)) {
    return {
      code: response.getErrorCode(),
      message: '请选择正确的部门',
    }
  }

  const saveType = params[0];
  if (!['submit', 'draft'].includes(saveType)) {
    return {
      code: response.getErrorCode(),
      message: '不存在的保存类型',
    }
  }

  args.days = moment(+args.days).startOf('day').toDate().getTime();

  if (saveType === 'draft') {
    args.state = 1;
  } else {
    args.state = 0;
  }

  args.user_id = req.user.id;
  const relaxAction = await relaxActionService.create(args);

  return {
    code: response.getSuccessCode('create'),
    message: '创建成功',
    data: {
      relax_action: relaxAction,
    }
  }
};