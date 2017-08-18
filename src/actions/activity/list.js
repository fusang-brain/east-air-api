/**
 * Created by alixez on 17-7-29.
 */
import {filterParams} from '../../utils/filters';
import moment from 'moment';

export default async function (req, param, {response, models, device, checkAccess}) {
  await checkAccess('activity', 'view');
  const params = filterParams(req.query, {
    search: 'string',
    state: 'string',
  });

  console.log(req.dataAccess);
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
  condition.dept_id = {
    $in: req.dataAccess,
  }
  const total = await ActModel.count({
    where: condition,
  });

  const acts = await ActModel.all({
    where: condition,
    attributes: attributes,
    include: [
      {
        model: models.User,
        as: 'publisher',
        required: true,
        attributes: ['id', 'name', 'avatar']
      },
      {
        model: models.Dept,
        as: 'department',
        required: true,
        attributes: ['id', 'dept_name'],
      },
      {
        model: models.ActEvaluation,
        as: 'evaluations',
        where: {
          user_id: req.user.id,
        },
        required: false,
      }
    ],
    order: [
      ['create_date', 'DESC'],
    ],
    offset,
    limit,
  });
  const todayStart = moment().startOf('day');

  const list = acts.map(act => {
    let endDateStart = moment(+act.end_date).add(1, 'day').startOf('day');
    let isEnd = false;
    if (endDateStart.toDate().getTime() <= todayStart.toDate().getTime()) {
      isEnd = true;
    }

    let has_evaluation = false;

    if (Array.isArray(act.evaluations) && act.evaluations.length > 0) {
      has_evaluation = true;
    }
    return {
      no: act.no,
      id: act.id,
      subject: act.subject,
      act_type: act.act_type,
      create_date: act.create_date,
      state: act.state,
      start_date: act.start_date,
      end_date: act.end_date,
      process: act.process,
      publisher: act.publisher,
      department: act.department,
      is_end: isEnd,
      has_evaluation,
    }

  });

  return {
    code: response.getSuccessCode(),
    message: '查询成功',
    data: {
      total,
      list
    }
  }

}