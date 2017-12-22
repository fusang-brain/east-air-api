/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/12/22
 */
import { filterParams } from '../../utils/filters'
import Response from '../../config/response'

export default async (req, params, { response, services }) => {
  const args = filterParams(req.body, {
    id: ['string', 'required'],
  })

  await services.doc.remove(args.id);

  return {
    code: Response.getSuccessCode('remove'),
    message: '公文删除成功',
  }
}