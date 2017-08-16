/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/16
 */

import DocService from '../../service/DocService';
import {filterParams} from '../../utils/filters'
const docService = new DocService();

export default async (req, params, {response}) => {
  const args = filterParams(req.body, {
    doc_title: ['string', 'required'],
    doc_type: ['integer', 'required'],
    doc_level: ['string', 'required'],
    doc_note: ['string', 'required'],
    receivers: ['array', 'required'],
    attach: ['array']
  });

  const createdDoc = await docService.create(args);

  return {
    code: response.getSuccessCode(),
    message: '新增成功',
    data: {
      doc: createdDoc,
    }
  }
}