/**
 * Created by alixez on 17-7-29.
 */
import {filterParams} from '../../utils/filters';
import moment from 'moment';

export default async function (req, param, {response, models, services, device, checkAccess}) {
  await checkAccess('activity', 'view');
  const params = filterParams(req.query, {
    search: 'string',
    state: 'string',
  });

  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;

  // found all department master
  const masters = await services.user.getAllMaster(req.user.dept);
  const masterIDs = masters.map(master => master.id);

  const condition = {
    $or: [
      // 用户自己发起的活动
      {
        user_id: req.user.id,
      },

      // 数据权限内已通过的活动
      {
        user_id: {
          $ne: req.user.id,
        },
        state: 2,
      },

      // // 部门主管发起的活动
      // {
      //   user_id: {
      //     $in: masterIDs,
      //   },
      //   state: 2,
      // }

    ],
  };
  const ActModel = models.TradeUnionAct;
  let attributes = ['no', 'id', 'subject', 'act_type', 'create_date', 'state', 'start_date', 'end_date'];
  if (device === 'app') {
    attributes.push('process');
  }

  if (params.search) {
    condition.$or[0].subject = {
      $like: `%${params.search}%`,
    };
    condition.$or[1].subject = {
      $like: `%${params.search}%`,
    };
  }

  if (params.state) {
    condition.$or[0].state = params.state;
    condition.$or[1].state = params.state;
    if (params.state !== 2) {
      condition.$or[1].user_id = req.user.id;
    }
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
      },
      {
        model: models.TradeUnionActDept,
        as: 'accept_depts',
        where: {
          $or: [
            {
              dept_id: req.user.dept,
            },
            {
              dept_id: req.user.department.parent,
            }
          ]
        },
        required: true,
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
    // const qodeStr = `eastern://sign_act?act_id=${act.id}`;
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
      // qode_str: qodeStr,
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