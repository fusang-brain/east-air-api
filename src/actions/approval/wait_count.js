/**
 * Created by alixez on 17-8-10.
 */
export default async function (req, params, {response, checkAccess, services}) {

  let activityWaitCount = 0;
  let sympathyWaitCount = 0;
  let grantWaitCount = 0;
  if (checkAccess('grant_approval', 'activity_funding', false)) {
    activityWaitCount = await services.approval.waitCount(1, req.user.id);
    sympathyWaitCount = await services.approval.waitCount(2, req.user.id);
  }

  if (checkAccess('grant_approval', 'apply_funding', false)) {
    grantWaitCount = await services.approval.waitCount(3, req.user.id);
  }

  // todo get unread doc count
  const unreadDocTotal = await services.doc.unreadTotal(req.user.id);

  return {
    code: response.getSuccessCode(),
    message: '查询成功',
    data: {
      activity: parseInt(activityWaitCount) + sympathyWaitCount,
      grant: +grantWaitCount,
      doc: unreadDocTotal,
    }
  }
}