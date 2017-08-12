/**
 * Created by alixez on 17-8-11.
 */
import {filterParams} from '../../utils/filters';
import RelaxActionService from '../../service/RelaxActionService';

const relaxActionService = new RelaxActionService();

export default async function (req, params, {response}) {
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