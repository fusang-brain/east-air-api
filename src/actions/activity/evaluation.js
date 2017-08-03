/**
 * Created by alixez on 17-8-2.
 */
import {filterParams} from '../../utils/filters';

export default async function (req, params, {response, models, device}) {
  const args = filterParams(req.body, {
    act_id: ['string', 'required'],
    result: ['boolean'],
    content: ['string'],
  });
  const {actID, ...setData} = args;
  const user = req.user;
  const ActEvaluation = models.ActEvaluation;
  const actTotal = await ActEvaluation.count({
    where: {
      user_id: user.id,
      act_id: actID,
    }
  });
  if (actTotal > 0) {
    await ActEvaluation.update(setData, {
      where: {
        act_id: actID,
        user_id: req.user.id,
      }
    });

    return {
      code: response.getSuccessCode(),
      message: '修改成功',
    }
  }

  args.user_id = req.user.id;
  await ActEvaluation.create(args);

  return {
    code: response.getSuccessCode(),
    message: '评价成功',
  }
}