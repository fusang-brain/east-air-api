/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/14
 */

import SympathyService from '../../service/SympathyService';

export default async function (req, params, {response}) {

  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;
  const start = req.query.start || null;
  const end = req.query.end || null;

  const sympathyService = new SympathyService();
  const total = await sympathyService.statisticsResultTotal({start, end});
  const list = await sympathyService.statisticsResult(offset, limit, {start, end});
  const details = await sympathyService.statisticsDetails();

  list.map(row => {
    row.details = [];
    details.forEach(detail => {
      if (detail.dept_id === row.dept_id) {
        row.details.push({
          sympathy_type: detail.sympathy_type,
          person_num: detail.person_num,
        });
      }
    })
  })

  return {
    code: response.getSuccessCode(),
    message: '查看成功',
    data: {
      total,
      statistic_result: list,
    }
  }
}