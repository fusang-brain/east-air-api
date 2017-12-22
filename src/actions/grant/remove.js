/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/14
 */
import {filterParams} from '../../utils/filters';
import GrantApplicationService from '../../service/GrantApplicationService';

export default async function (req, params, {response, checkAccess, services, device }) {

  if (device === 'web') {
    await checkAccess('grant_application', 'remove');
  }
  
  const args = filterParams(req.body, {
    id: ['string', 'required'],
  });

  const grantApplicationService = services.grantApplication;

  await grantApplicationService.remove(args.id, req.user.id);

  return {
    code: response.getSuccessCode('remove'),
    data: {},
    message: '删除成功',
  }
}