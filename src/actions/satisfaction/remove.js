/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/23
 */
import { filterParams } from '../../utils/filters'

export default async (req, params, {response, services}) => {

  const args = filterParams(req.body, {
    id: ['string', 'required'],
  });

  await services.satisfaction.remove(args.id);

  return {
    code: response.getSuccessCode(),
    message: '删除成功',
  }
}