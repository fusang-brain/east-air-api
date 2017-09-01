/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/22
 */
import {filterParams} from '../../utils/filters';

export default async (req, params, {response, services}) => {
  const args = filterParams(req.body, {
    title: ['string', 'required'],
    content: ['string', 'required'],
  });

  args.dept_id = req.user.dept;
  args.user_id = req.user.id;

  const createdIntention = await services.intention.create(args);

  return {
    code: response.getSuccessCode(),
    message: '创建成功',
    data: {
      intention: createdIntention,
    }
  }
}