/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/13
 */
import {filterParams} from '../../utils/filters';
import SympathyService from '../../service/SympathyService';

export default async function (req, params, {response, checkAccess, services, device}) {

  if (device === 'web') {
    await checkAccess('sympathy', 'remove');
  }

  const args = filterParams(req.body, {
    id: ['string', 'required'],
  });

  const sympathyService = services.sympathy;

  await sympathyService.remove(args.id, req.user.id);

  return {
    code: response.getSuccessCode('remove'),
    data: {},
    message: '删除成功',
  }
}