/**
 * Created by alixez on 17-8-11.
 */
export default async function (req, params, {response, checkAccess, services}) {
  await checkAccess('relax_action', 'statistics');
  const relaxActionService = services.relaxAction;
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;
  const start = req.query.start || null;
  const end = req.query.end || null;
  const total = await relaxActionService.statisticsResultTotal({start, end});
  const list = await relaxActionService.statisticsResult(offset, limit, {start, end});
  const details = await relaxActionService.statisticsDetails({start, end});

  list.map(row => {
    row.details = [];
    details.forEach(detail => {
      if (detail.dept_id === row.dept_id) {
        row.details.push({
          person_category: detail.person_category,
          people_number: detail.people_number,
        });
      }
    });
    return row;
  });

  return {
    code: response.getSuccessCode(),
    message: '查询成功',
    data: {
      total: +total[0].total,
      statistic_result: list,
    }
  }
}