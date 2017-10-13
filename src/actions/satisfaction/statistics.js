/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/23
 */
import { filterParams } from '../../utils/filters'

export default async (req, params, {response, services, models, checkAccess}) => {
  await checkAccess('satisfaction_degree_investigation', 'data_statistics');
  const requestType = params[0];
  let args = {};

  if (!['site', 'person'].includes(requestType)) {
    return {
      code: response.getErrorCode(),
      message: '非法访问',
    }
  }

  if (requestType === 'site') {
    args = filterParams(req.query, {
      id: ['string', 'required'],
      filter_by: 'string',
      filter_dept: 'string',
      to_heavy: 'string',
    });
  }

  if (requestType === 'person') {
    args = filterParams(req.query, {
      id: 'string',
      dept_id: 'string',
      filter_by: 'string',
    });
  }

  if (args.to_heavy === 'true') {
    args.to_heavy = true;
  }

  if (args.to_heavy === 'false') {
    args.to_heavy = false;
  }
  let department = {};
  if (args.dept_id) {
    department = await models.Dept.findOne({
      where: {
        id: args.dept_id,
      }
    })
  }

  const results = await services.satisfaction.statisticVote({
    survey_id: args.id || null,
    dept_id: args.dept_id || null,
    filter_by: args.filter_by || 'week',
    filter_dept: args.filter_dept || null,
    to_heavy: args.to_heavy || false,
  });

  return {
    code: response.getSuccessCode(),
    message: '获取成功',
    data: {
      results,
      department,
    }
  }
}