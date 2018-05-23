
import uuid from 'uuid';

export default async (req, params, {response, services, checkAccess}) => {
  for (let i = 0; i < 10; i ++) {
    console.log(uuid.v4());
  }

  return {
    dd: 'haha',
  }
}