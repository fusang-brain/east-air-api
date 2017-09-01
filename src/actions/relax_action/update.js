/**
 * Created by alixez on 17-8-11.
 */
import RelaxActionService from '../../service/RelaxActionService';
import {filterParams} from '../../utils/filters';
import moment from 'moment';


export default async function (req, params, {response, services}) {
  const relaxActionService = services.relaxAction;
  const args = filterParams(req.body, {
    id: ['string', 'required'],
    title: ['string', 'filter_none'],
    action_type: ['integer'],
    per_capita_budget: ['number'],
    days: ['integer'],
    date: ['string', 'filter_none'],
    place: ['string', 'filter_none'],
    people: ['array'],
  });

  console.log(args);

  const saveType = params[0];
  if (!['submit', 'draft'].includes(saveType)) {
    return {
      code: response.getErrorCode(),
      message: '不存在的保存类型',
    }
  }

  if (saveType === 'draft') {
    args.state = 0;
  } else {
    args.state = 1;
  }

  if (args.date) {
    args.date = moment(+args.date).startOf('day').toDate().getTime();
  }
  await relaxActionService.update(args);

  return {
    code: response.getSuccessCode('update'),
    message: '修改成功'
  }
}