/**
 * Created by alixez on 17-8-11.
 */
import RelaxActionService from '../../service/RelaxActionService';
import {filterParams} from '../../utils/filters';
import moment from 'moment';

const relaxActionService = new RelaxActionService();

export default async function (req, params, {response, models}) {

  const args = filterParams(req.body, {
    title: ['string', 'filter_none'],
    action_type: ['integer'],
    per_capita_budget: ['number'],
    days: ['integer'],
    date: ['string', 'filter_none'],
    place: ['string', 'filter_none'],
    people: ['array'],
  });
  if (args.days) {
    args.days = moment(+args.days).startOf('day').toDate().getTime();
  }
  await relaxActionService.update(args);

  return {
    code: response.getSuccessCode('update'),
    message: '修改成功'
  }
}