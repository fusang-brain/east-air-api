/**
 * By Alpha
 * Author: alixez <alixe.z@foxmail.com>
 * Date: 2017/8/21
 */
import {filterParams} from '../../utils/filters'
export default async (req, params, {response, services}) => {
  const args = filterParams(req.body, {
    id: ['string', 'required'],
  })

  // 获取未读总数
  const docHasReadTotal = await services.doc.docHasReadTotal(args.id);
  const docReceiverTotal = await services.doc.docReceiverTotal(args.id);

  const docUnReadTotal = docReceiverTotal - docHasReadTotal;

  const lastReminder = await services.doc.getLastReminder(args.id);
  if (lastReminder) {

    console.log(parseInt(lastReminder.last_remind_time) + (10 * 60 * 1000), '1')
    console.log(Date.now(), '2');

    if ((parseInt(lastReminder.last_remind_time) + (10 * 60 * 1000)) > Date.now()) {
      return {
        code: response.getErrorCode(),
        message: '您的操作过于频繁，请稍后再试试',
      }
    }
  }

  if (docUnReadTotal === 0) {
    return {
      code: response.getErrorCode(),
      message: '没有需要提醒的接收者',
    }
  }

  const allUnreadReceivers = await services.doc.getUnreadReceivers(args.id);

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

  await services.doc.setReminder(args.id);

  return {
    code: response.getSuccessCode(),
    message: '提醒成功！',
  }
}