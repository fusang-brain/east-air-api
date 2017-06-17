/**
 * Created by alixez on 17-6-17.
 */
import Auth from '../../utils/auth';

export default async function (req, params, {models}) {
  const data = req.body;
  await models.User.create({
    name: '其他',
    mobile: '18627894264',
    nickname: '其他',
    birthday: new Date().getTime(),
    card_num: '--',
    password: Auth.encodePassword('7C4A8D09CA3762AF61E59520943DC26494F8941B'), // '1234567'
  });

  return {
    code: 1000,
    message: '添加成功',
  }
}