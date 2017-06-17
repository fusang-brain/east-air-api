/**
 * Created by alixez on 17-6-15.
 */
import Auth from '../../utils/auth';

export default async function (req) {
  await Auth.checkAuth(req);
  console.log(req.user);
  return {
    a: '========',
  }
}