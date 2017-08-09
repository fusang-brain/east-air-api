/**
 * Created by alixez on 17-8-9.
 */


import {filterParams} from '../../utils/filters';
import moment from 'moment';
import xlsx from 'node-xlsx';

export default async function(req, params, {models, response}) {
  const token = req.query.token;
  const DownloadToken = models.DownloadToken;

  if (!token) {
    return {
      code: response.getErrorCode(),
      message: '参数错误',
    }
  }

  const foundCount = await DownloadToken.count({
    where: {
      token: token,
      used: false,
    }
  });

  if (foundCount === 0) {
    return {
      code: response.getErrorCode(),
      message: '无效的校验',
    }
  }

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
  if (args.search) {
    condition.$or = {
      ehr: {$like: `%${args.search}%`},
      name: {$like: `%${args.search}%`},
      mobile: {$like: `%${args.search}%`},
    };
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

  const list = await UserModel.all({
    where: condition,
    attributes: ['id', 'name', 'no', 'birthday', 'ehr', 'gender', 'mobile', 'type', 'state', 'other_status'],
    include: [
      {model: models.Dept, as: 'department'},
    ]
  });

  let allData = [['EHR', '姓名', '性别', '出生日期', '手机号码', '用工性质', '工会', '状态']];
  const genderMapper = ['未知', '男', '女'];
  const typeMapper = ['合同制', '劳务制'];
  const statusMapper = ['其他', '在职', '离职', '退休'];
  const data = list.map(item => {
    let status = statusMapper[+item.state];
    if (item.other_status === 1) {
      status = '困难';
    }
    return [
      item.ehr,
      item.name,
      genderMapper[+item.gender],
      moment(+item.birthday).format('YYYY-MM-DD'),
      item.mobile,
      typeMapper[+item.type],
      item.department.dept_name,
      status,
    ]
  });
  allData = allData.concat(data);
  const buffer = xlsx.build([{name: '用户列表', data: allData}]);
  let filename = moment().format('YYYYMMDDHHmmss');
  await DownloadToken.destroy({where: {token: token}});
  return res => {
    res.set('Content-Disposition', `attachment; filename=${filename}.xlsx`);
    res.send(buffer);
  }
}