/**
 * Created by alixez on 17-7-29.
 */
import {filterParams} from '../../utils/filters';
import moment from 'moment';

export default async function (req, param, {response, models, device}) {
  const params = filterParams(req.query, {
    search: 'string',
    state: 'string',
  });
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;
  const condition = {};
  const ActModel = models.TradeUnionAct;
  let attributes = ['no', 'id', 'subject', 'act_type', 'create_date', 'state', 'start_date', 'end_date'];
  if (device === 'app') {
    attributes.push('process');
  }
  if (params.search) {
    condition.subject = {
      $like: `%${params.search}%`,
    };
  }
  if (params.state) {
    condition.state = params.state
  }
  const total = await ActModel.count({
    where: condition,
  });

  const list = await ActModel.all({
    where: condition,
    attributes: attributes,
    include: [
      {
        model: models.User,
        as: 'publisher',
        required: false,
        attributes: ['id', 'name', 'avatar']
      },
      {
        model: models.Dept,
        as: 'department',
        required: false,
        attributes: ['id', 'dept_name'],
      }
    ],
    order: [
      ['create_date', 'DESC'],
    ],
    offset,
    limit,
  });
  const todayStart = moment().startOf('day');
  for (let i = 0; i < list.length; i ++) {
    let item = list[i];
    let endDateStart = moment(+item.end_date).add(1, 'day').startOf('day');
    let isEnd = false;
    if (endDateStart.toDate().getTime() <= todayStart.toDate().getTime()) {
      isEnd = true;
    }
    item.setDataValue('is_end', isEnd);
  }

  return {
    code: response.getSuccessCode(),
    message: '查询成功',
    data: {
      total,
      list
    }
  }

}