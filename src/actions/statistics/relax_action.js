/**
 * Created by alixez on 17-8-11.
 */
import RelaxActionService from '../../service/RelaxActionService';

const relaxActonService = new RelaxActionService();
export default async function (req, params, {response, models}) {
  const list = await relaxActonService.statisticsResult();
  const details = await relaxActonService.statisticsDetails();
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
      statistic_result: list,
    }
  }
}