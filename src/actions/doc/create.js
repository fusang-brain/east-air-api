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

  args.user_id = req.user.id;

  const createdDoc = await docService.create(args);

  const allUnreadReceivers = await services.doc.getUnreadReceivers(createdDoc.id);

  const unreadReceiverIDs = allUnreadReceivers.map(value => value.receiver_id);

  const doc = await services.doc.one(args.id);

  await services.notification.sendToPeople({
    title: `【公文】${doc.doc_title}`,
    body: doc.doc_note || doc.doc_title,
    sender: null,
    items: [{
      subject_id: args.id,
      subject_type: 4,
      is_approval: false,
    }],
    receivers: unreadReceiverIDs,
    template: 'doc',
  });

  return {
    code: response.getSuccessCode(),
    message: '新增成功',
    data: {
      doc: createdDoc,
    }
  }
}