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
  if (req.query.status === '1') {
    condition.state = {
      $eq: 1,
    }
  } else {
    condition.state = {
      $ne: 1,
    }
  }
  if (args.search) {
    condition.$or = {
      ehr: { $like: `%${args.search}%`},
      name: { $like: `%${args.search}%`},
      mobile: { $like: `%${args.search}%`},
    };
    delete condition.search;
  }
  if (args.birthday) {
    condition.birthday = {
      $gte: args.birthday[0],
      $lte: args.birthday[1],
    };
  }
  if (args.deadline) {
    const currentTime = Date.now();
    const startOfTime = moment().subtract(args.deadline, 'days').toDate().getTime();
    condition.update_at = {
      $gte: startOfTime,
      $lte: currentTime,
    };
    delete args.deadline;
  }
  if (args.integrate) {
    condition.integration = {
      $gte: +args.integrate[0],
      $lte: +args.integrate[1],
    };
    delete args.integrate;
  }
  const UserModel = models.User;
  const total = await UserModel.count();
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;
  console.log(condition);
  const list = await UserModel.all({
    where: condition,
    offset,
    limit,
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