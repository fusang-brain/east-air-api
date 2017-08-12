/**
 * Created by alixez on 17-8-11.
 */

import {filterParams} from '../../utils/filters';
import RelaxActionService from '../../service/RelaxActionService';

const relaxActionService = new RelaxActionService();

export default async function (req, params, {response}) {
  const args = filterParams(req.body, {
    id: ['string', 'required'],
  });

  await relaxActionService.remove(args.id);
  return {
    code: response.getSuccessCode('remove'),
    message: '删除成功',
  }
}