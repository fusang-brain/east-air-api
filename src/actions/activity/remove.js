/**
 * Created by alixez on 17-7-29.
 */

import ActivityService from '../../service/ActivityService';

export default async function (req, params, {response, checkAccess, services}) {
  await checkAccess('activity', 'remove');
  const actID = req.body.act_id;
  // const activityService = new ActivityService();
  await services.activity.remove(actID, req.dataAccess);

  return {
    code: response.getSuccessCode('remove'),
    message: '删除成功',
  }
}