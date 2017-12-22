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
      // console.log(condition.birthday);
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

  // set data access to list
  if (device !== 'app' && req.user.user_role.role_slug !== 'root') {
    req.dataAccess.push(req.user.department.parent);
    req.dataAccess.push(req.user.department.id);
    // const dept = condition.dept;
    condition.dept = {
      $and: [
        {
          $in: req.dataAccess.length > 0 ? req.dataAccess : [req.user.department.parent],
        }
      ]
    }
    if (args.dept) {
      condition.dept.$and.push({
        $eq: args.dept,
      });
    }

    // if (condition.dept) {
    //
    // }
    // condition.dept =  {
    //   $in: req.dataAccess.length > 0 ? req.dataAccess : [req.user.department.parent],
    // };
  }
  const UserModel = models.User;
  const DeptModel = models.Dept;
  const allDepts = await DeptModel.all();
  const allDeptMap = {};
  allDepts.forEach(_ => {
    allDeptMap[_.id] = _;
  })
  const total = await UserModel.count({
    where: condition,
  });
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;

  const list = await UserModel.all({
    where: condition,
    attributes: ['id', 'name', 'no', 'birthday', 'ehr', 'gender', 'mobile', 'type', 'state', 'other_status'],
    include: [
      {
        model: models.Dept,
        as:'department',
      },
    ],
    offset,
    limit,
    order: [
      ['create_at', 'DESC'],
    ]
  });

  const formatList = list.map(_ => {
    if (_.department) {
      _.setDataValue('department', allDeptMap[_.department.parent]);
    }
    return _;
  });
  return {
    code: getSuccessCode(),
    message: '获取列表成功',
    data: {
      total: total,
      users: formatList.filter(_ => _.name !== 'root'),
    }
  }
}