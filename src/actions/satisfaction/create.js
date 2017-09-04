/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/22
 */
import { filterParams } from '../../utils/filters'

export default async (req, params, {response, services, checkAccess}) => {
  await checkAccess('satisfaction_degree_investigation', 'create');
  const args = filterParams(req.body, {
    survey_subject: ['string', 'required'],
    image: ['string', 'required'],
  });

  args.user_id = req.user.id;

  const createdSurvey = await services.satisfaction.create(args);

  return {
    code: response.getSuccessCode('create'),
    message: '创建成功',
    data: {
      survey: createdSurvey,
    }
  }
}