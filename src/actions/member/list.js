/**
 * Created by alixez on 17-6-20.
 */
import {getSuccessCode, getErrorCode} from '../../config/response';
import {filterParams} from '../../utils/filters';
import moment from 'moment';

export default async function(req, params, {models, device}) {
  const args = filterParams(req.query, {
    search: 'string',
    other_status: 'string',
    dept: 'string',
    deadline: 'string', // 天
    gender: 'string',
    birthday: 'array',
    type: 'string',
    integrate: 'array',
  });
  const condition = {...args};
  delete condition.search;
  if (req.query.status === '1') {
    condition.state = {
      $eq: 1,
    }
  } else {
    condition.state = {
      $ne: 1,
    }
  }
  condition.name = {
    $ne: 'root',
  }
  if (args.search) {
    condition.$or = {
      name: { $like: `%${args.search}%`},
      mobile: { $like: `%${args.search}%`},
    };
  }
  if (args.birthday) {
    if (args.birthday[0] === args.birthday[1]) {
      condition.birthday = moment(+args.birthday[0]).valueOf();
      console.log(condition.birthday);
    } else {
      condition.birthday = {
        $gte: args.birthday[0],
        $lte: args.birthday[1],
      };
    }
  }
  if (args.deadline) {
    const currentTime = Date.now();
    const startOfTime = moment().subtract(args.deadline, 'days').toDate().getTime();
    condition.update_at = {
      $gte: startOfTime,
      $lte: currentTime,
    };
    delete condition.deadline;
  }
  if (args.integrate) {
    condition.integration = {
      $gte: +args.integrate[0],
      $lte: +args.integrate[1],
    };
    delete condition.integrate;
  }
  const UserModel = models.User;
  const total = await UserModel.count({
    where: condition,
  });
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;
  const list = await UserModel.all({
    where: condition,
    attributes: ['id', 'name', 'no', 'birthday', 'ehr', 'gender', 'mobile', 'type', 'state', 'other_status'],
    include: [
      {model: models.Dept, as:'department'},
    ],
    offset,
    limit,
    order: [
      ['create_at', 'DESC'],
    ]
  });


  return {
    code: getSuccessCode(),
    message: '获取列表成功',
    data: {
      total: total,
      users: list,
    }
  }
}