/**
 * Created by alixez on 17-6-22.
 */
import {filterParams} from '../../utils/filters';

export default async function (req, params, {models, response}) {

  const args = filterParams(req.body, {
    username: ['required', 'string'],
    password: ['string'],
  });

  console.log(args,'=======');

  return {
    code: 100,
    message: 'ok'
  }
}