/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/14
 */
import SympathyService from '../../service/SympathyService';
import RelaxActionService from '../../service/RelaxActionService';
import {filterParams} from '../../utils/filters';
import moment from 'moment';
import xlsx from 'node-xlsx';

const sympathyService = new SympathyService();
const relaxActionService = new RelaxActionService();


export default async function(req, params, {models, response}) {
  const saveType = params[0];
  const start = req.query.start || null;
  const end = req.query.end || null;
  if (!['relax_action', 'sympathy'].includes(saveType)) {
    return {
      code: response.getErrorCode(),
      message: '不存在的导出类型',
    }
  }

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
  let buffer = null;

  if (saveType === 'relax_action') {
    buffer = await getRelaxActionExportBuffer(start, end);
  }

  if (saveType === 'sympathy') {
    buffer = await getSympathyExportBuffer(start, end);
  }

  // await DownloadToken.destroy({where: {token: token}});
  let filename = moment().format('YYYYMMDDHHmmss');
  return res => {
    res.set('Content-Disposition', `attachment; filename=${filename}.xlsx`);
    res.send(buffer);
  }
}

async function getSympathyExportBuffer (start, end) {
  const list = await sympathyService.statisticsResult(null, null, {start, end});
  const details = await sympathyService.statisticsDetails({start, end});
  let excelData = [['部门', '发起慰问次数', '慰问人数', '困难员工', '生病员工', '一线员工', '其他', '慰问总金额', '慰问品金额']];
  for (let i = 0; i < list.length; i ++) {
    let item = list[i];
    let sympathyDetails = {};
    for (let j = 0; j < details.length; j ++) {
      let detail = details[j];
      if (detail.dept_id === item.dept_id) {
        sympathyDetails[detail.sympathy_type] = detail.person_num;
      }
    }
    excelData.push([item.dept_name, item.all_times, item.people_total, sympathyDetails[1] || '0', sympathyDetails[2] || '0', sympathyDetails[3] || '0', sympathyDetails[0] || '0', item.total_amount, item.good_total_amount]);
  }

  return  xlsx.build([{name: '慰问统计结果', data: excelData}]);

}

async function getRelaxActionExportBuffer (start, end) {
  const list = await relaxActionService.statisticsResult(null, null, {start, end});
  const details = await relaxActionService.statisticsDetails();
  let excelData = [['部门', '疗休养次数', '机务人员', '有毒有害工种人员', '康复人员', '先进人员', '献血人员', '管理人员技术人员', '职工', '劳务工', '疗休养人数', '总金额']];

  for (let i = 0; i < list.length; i ++) {
    let item = list[i];
    let relaxActionDetails = {};
    for (let j = 0; j < details.length; j ++) {
      let detail = details[j];
      if (detail.dept_id === item.dept_id) {
        relaxActionDetails[detail.person_category] = detail.people_number;
      }
    }
    excelData.push([item.dept_name,
      item.all_times,
      relaxActionDetails[0],
      relaxActionDetails[1],
      relaxActionDetails[2],
      relaxActionDetails[3],
      relaxActionDetails[4],
      relaxActionDetails[5],
      relaxActionDetails[6],
      relaxActionDetails[7],
      item.all_people,
      item.total_amount]);
  }

  return xlsx.build([{name: '疗休养统计结果', data: excelData}]);
}