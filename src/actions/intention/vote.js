/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/22
 */
import {filterParams} from '../../utils/filters'
export default async (req, params, {response, services}) => {
  const args = filterParams(req.body, {
    id: ['string', 'required'],
  });

  await services.intention.vote(args.id, req.user.id);

  return {
    code: response.getSuccessCode(),
    message: '投票成功',
  }
}