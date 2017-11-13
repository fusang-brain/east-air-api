/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/11/11
 */

import { filterParams} from '../../utils/filters';

export default async function (req, params, {response, services}) {
  const {id, ...args} = filterParams(req.body, {
    id: ['string', 'required'],
    title: ['string', 'required'],
    vod_type: ['integer', 'required'],
    category: ['integer', 'required'],
    description: ['string', 'required'],
  });

  await services.vod.update(id, args);

  return {
    code: response.getSuccessCode(),
    message: '修改成功',
  }
}