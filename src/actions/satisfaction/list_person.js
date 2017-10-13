/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/23
 */

export default async (req, params, {response, services}) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;
  const dept = req.query.dept || null;

  const {list, total} = await services.satisfaction.generatePersonList({
    limit,
    offset,
    dept: dept,
  });

  const resList = list.map(item => ({
    survey_id: item.id,
    user_id: item.survey_user.id,
    name: item.survey_user.name,
    jobs: item.survey_user.jobs,
  }));

  return {
    code: response.getSuccessCode(),
    message: '获取成功',
    data: {
      list: resList,
      total,
    }
  }
}