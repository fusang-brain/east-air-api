/**
 * Created by alixez on 17-7-29.
 */

import ActivityService from '../../service/ActivityService';

/**
 * Remove Activity
 * @param req HttpRequest object
 * @param params Request params
 * @param response Response class
 * @param models Mapper of models
 * @param device The device of user
 * @param services Mapper of services
 * @returns Object Response Object
 */
export default async function (req, params, {response, checkAccess, services, device}) {
  if (device === 'web') {
    await checkAccess('activity', 'remove');
  }

  const actID = req.body.act_id;
  // const activityService = new ActivityService();
  await services.activity.remove(actID, req.user.id);

  return {
    code: response.getSuccessCode('remove'),
    data: {},
    message: '删除成功',
  }
}