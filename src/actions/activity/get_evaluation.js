/**
 * Created by alixez on 17-8-2.
 */

export default async function (req, params, {response, models, device, checkAccess}) {
  await checkAccess('activity', 'view')
  const user = req.user;
  const actID = req.query.act_id;
  const ActEvaluation = models.ActEvaluation;
  const foundActEvaluation = await ActEvaluation.findOne({
    where: {
      user_id: user.id,
      act_id: actID,
    }
  });

  return {
    code: response.getSuccessCode(),
    message: '查看成功',
    data: {
      act_evaluation: foundActEvaluation,
    }
  }
}