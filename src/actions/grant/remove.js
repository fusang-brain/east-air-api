/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/14
 */
import {filterParams} from '../../utils/filters';
import GrantApplicationService from '../../service/GrantApplicationService';

export default async function (req, params, {response}) {
  const args = filterParams(req.body, {
    id: ['string', 'required'],
  });

  const grantApplicationService = new GrantApplicationService();

  await grantApplicationService.remove(args.id);

  return {
    code: response.getSuccessCode('remove'),
    message: '删除成功',
  }
}