/**
 * Created by alixez on 17-8-11.
 */
import {filterParams} from '../../utils/filters';
import RelaxActionService from '../../service/RelaxActionService';

export default async function (req, params, {response, services, checkAccess}) {
  await checkAccess('relax_action', 'view');
  const relaxActionService = services.relaxAction;
  const args = filterParams(req.query, {
    id: ['string', 'required'],
  });

  const details = await relaxActionService.details(args.id);
  return {
    code: response.getSuccessCode(),
    message: '查询成功',
    data: {
      relax_action: details,
    }
  }
}