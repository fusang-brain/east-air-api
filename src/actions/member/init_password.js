/**
 * Created by alixez on 17-8-9.
 */
import Auth from '../../utils/auth';
import sha1 from 'crypto-js/sha1';

export default async function (req, params, {response, models, checkAccess}) {
  const id = req.body.id;
  await checkAccess('member', 'edit');
  const user = await models.User.scope('with_password').findOne({
    where: {
      id: id,
    }
  });

  const pwd = sha1(user.card_num.substring(user.card_num.length - 6)).toString().toUpperCase();
  user.password = Auth.encodePassword(pwd);

  await user.save();

  return {
    code: response.getSuccessCode(),
    message: '重置成功',
  }
}