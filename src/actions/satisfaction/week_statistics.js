/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/24
 */
import { filterParams } from '../../utils/filters'

export default async (req, params, {response, services, models}) => {
  if (!['site', 'person'].includes(params[0])) {
    return {
      code: response.getErrorCode(),
      message: '非法访问',
    }
  }
  let args = {};

  if (params[0] === 'site') {
    args = filterParams(req.query, {
      id: ['string', 'required'],
    });
  }

  if (params[0] === 'person') {
    args = filterParams(req.query, {
      id: 'string',
      dept_id: 'string',
    })
  }

  if (args.dept_id) {
    delete args.id;
  }

  let department = {};
  if (args.dept_id) {
    department = await models.Dept.findOne({
      where: {
        id: args.dept_id,
      }
    });
  }

  const results = await services.satisfaction.recentWeekStatisticVote({
    survey_id: args.id || null,
    dept_id: args.dept_id || null,
    type: null,
  });

  return {
    code: response.getSuccessCode(),
    message: '查询成功',
    data: {
      results,
      department,
    }
  }
}