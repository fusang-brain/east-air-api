/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/23
 */
import { filterParams } from '../../utils/filters'

export default async (req, params, {response, services}) => {
  const args = filterParams(req.body, {
    id: ['string', 'required'],
    survey_subject: ['string'],
    image: ['string'],
  });

  const {id, ...otherArgs} = args;

  await services.satisfaction.update(id, otherArgs);

  return {
    code: response.getSuccessCode(),
    message: '修改成功',
  }
}