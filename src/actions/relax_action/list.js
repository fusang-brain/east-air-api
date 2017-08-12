/**
 * Created by alixez on 17-8-11.
 */
import {filterParams} from '../../utils/filters';
import moment from 'moment';
import RelaxActionService from '../../service/RelaxActionService';

const relaxActionService = new RelaxActionService();
export default async function (req, params, {response}) {
  const args = filterParams(req.query, {
    search: 'string',
    state: 'string',
  });
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;
  const state = args.state || 'all';
  const list = await relaxActionService.generateList({
    subject: args.search,
    status: state,
    offset,
    limit
  });
  const mappers = {
    actionType: ['未知', '自行', '委托'],
    state: ['草稿', '已提交'],
  };

  // todo return total, people_num, days
  const resList = list.map(item => {
    const start = moment(+item.date).format('YYYY-MM-DD');
    console.log(start);
    const endTime = moment(+item.date).add('day', +item.days);
    let isFinished = false;
    if (item.state !== 0 && endTime.toDate().getTime() < Date.now()) {
      isFinished = true;
    }
    return {
      no: item.no,
      title: item.title,
      action_type: mappers.actionType[item.action_type],
      state: isFinished ? '已完成' : mappers.state[item.state],
      days: item.days,
      total: item.total,
      people_number: item.people_number,
      duration: `${start} - ${endTime.format('YYYY-MM-DD HH:mm:ss')}`,
      department: item.department.dept_name,
      apply_time: item.apply_time,
    }
  });

  return {
    code: response.getSuccessCode(),
    message: '获取成功',
    data: {
      list: resList,
    }
  }
}