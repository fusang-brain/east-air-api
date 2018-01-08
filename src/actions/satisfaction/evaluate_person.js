/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/23
 */
import { filterParams } from '../../utils/filters';

export default async (req, params, {response, services}) => {
  const args = filterParams(req.body, {
    person_id: ['string', 'required'],
    satisfaction_level: ['string', 'required'],
    options: ['string', 'required'],
    tags: ['array'],
  });


  if (args.satisfaction_level === 'not_satisfied' && !args.tags) {
    throw {
      code: response.getErrorCode(),
      message: '标签不能为空',
    }
  }

  args.evaluate_person_id = req.user.id;
  const hasEvaluated = await services.satisfaction.hasEvaluated(req.user.id, args.survey_id);
  if (hasEvaluated) {
    return {
      code: response.getErrorCode(),
      message: '你今日已经评价！'
    }
  }
  await services.satisfaction.evaluate_person(args, req.user.id);

  return {
    code: response.getSuccessCode(),
    message: '评价成功',
  }
}