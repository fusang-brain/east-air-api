/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2018/1/24
 */
import xlsx from 'node-xlsx';
import moment from 'moment';

export default async (req, params, {response, services, models, checkAccess}) => {
  // await checkAccess('satisfaction_degree_investigation', 'data_statistics');
  const requestType = params[0];
  // let args = {};


  if (requestType === 'site') {
    const list = await services.satisfaction.getAllVoteData(requestType);
    const buffer = await getOtherExportBuffer(list);
    return res => {
      res.set('Content-Disposition', `attachment; filename=peopleSurveySite.xlsx`);
      res.send(buffer);
    }
  }

  if (requestType === 'person') {
    const list = await services.satisfaction.getAllVoteData(requestType);
    const buffer = await getExportBuffer(list);
    return res => {
      res.set('Content-Disposition', `attachment; filename=peopleSurveyPerson.xlsx`);
      res.send(buffer);
    }
  }

}

async function getExportBuffer (list) {
  let excelData = [['被评价人', '被评价人手机', '被评价人身份证号码', '评价人', '评价人手机', '评价人身份证号', '评价', '评价内容', '评价时间']];
  // 'very_satisfied': 非常满意 'satisfied': 满意 'not_satisfied': 不满意
  const Mapper = {
    'very_satisfied': '非常满意',
    'satisfied': '满意',
    'not_satisfied': '不满意',
  }
  for (let i = 0; i < list.length; i ++) {
    let item = list[i];
    excelData.push([item.survey_name,
      item.survey_mobile,
      item.survey_card_num,
      item.do_user_name,
      item.do_user_mobile,
      item.do_user_card_num,
      Mapper[item.satisfaction_level],
      item.options,
      moment(+item.evaluate_time).format('YYYY-MM-DD HH:mm:ss'),
      ]);
  }

  return xlsx.build([{name: '人员评价记录', data: excelData}]);
}

async function getOtherExportBuffer (list) {
  let excelData = [['评价对象', '评价人', '评价人手机', '评价人身份证号', '评价', '评价内容', '评价时间']];
  // 'very_satisfied': 非常满意 'satisfied': 满意 'not_satisfied': 不满意
  const Mapper = {
    'very_satisfied': '非常满意',
    'satisfied': '满意',
    'not_satisfied': '不满意',
  }
  for (let i = 0; i < list.length; i ++) {
    let item = list[i];
    excelData.push([
      item.survey_subject,
      item.do_user_name,
      item.do_user_mobile,
      item.do_user_card_num,
      Mapper[item.satisfaction_level],
      item.options,
      moment(+item.evaluate_time).format('YYYY-MM-DD HH:mm:ss'),
    ]);
  }

  return xlsx.build([{name: '评价记录', data: excelData}]);
}