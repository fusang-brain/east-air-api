/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/20
 */
import { filterParams } from '../../utils/filters'

export default async (req, params, {response, models, services}) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;

  const args = filterParams(req.query, {
    search: 'string',
    doc_type: 'string',
    doc_level: 'string',
  });

  args.doc_type = +args.doc_type;

  if (params[0] === 'unread') {
    args.unread = true;
  } else {
    args.unread = false;
  }

  const DocService = services.doc;

  const {total,list} = await DocService.generateList({offset, limit, filter: args, userID: req.user.id});




  return {
    code: response.getSuccessCode(),
    message: '查询成功',
    data: {
      total,
      list,
    }
  }
}
