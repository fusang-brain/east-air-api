/**
 * Created by alixez on 17-8-10.
 */
import RelaxActionService from '../../service/RelaxActionService';
import {filterParams} from '../../utils/filters';

const relaxActionService = new RelaxActionService();

export default async function (req, params, {response}) {
  const args = filterParams(req.body, {
    title: ['string', 'required'],
    action_type: ['integer', 'required'],
    per_capita_budget: ['number', 'required'],
    days: ['integer', 'required'],
    date: ['string', 'required'],
    place: ['string', 'required'],
    people: ['array', 'required'],
  });

  const saveType = params[0];
  if (!['submit', 'draft'].includes(saveType)) {
    return {
      code: response.getErrorCode(),
      message: '不存在的保存类型',
    }
  }

  if (saveType === 'draft') {
    args.state = 1;
  } else {
    args.state = 0;
  }

  const relaxAction = await relaxActionService.create(args);

  return {
    code: response.getSuccessCode('create'),
    message: '创建成功',
    data: {
      relax_action: relaxAction,
    }
  }
};