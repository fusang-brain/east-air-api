/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/9/2
 */
import { filterParams } from '../../utils/filters'

export default async (req, params, {response, services}) => {
  const args = filterParams(req.body, {
    id: ['string', 'required']
  });

  await services.intention.marked_hidden(args.id);

  return {
    code: response.getSuccessCode(),
    message: '标记成功',
  }
}