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
    doc_type: 'integer',
    doc_level: 'string',
  });

  const DocService = services.doc;

  const list = await DocService.generateList({offset, limit, filter: args});

  return {
    code: response.getSuccessCode(),
    message: '查询成功',
    data: {
      list,
    }
  }
}