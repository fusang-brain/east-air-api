/**
 * Created by alixez on 17-8-11.
 */

import {filterParams} from '../../utils/filters';
import RelaxActionService from '../../service/RelaxActionService';

export default async function (req, params, {response, services, device}) {
  const relaxActionService = services.relaxAction;
  const args = filterParams(req.body, {
    id: ['string', 'required'],
  });

  await relaxActionService.remove(args.id, req.user.id);
  return {
    code: response.getSuccessCode('remove'),
    data: {},
    message: '删除成功',
  }
}