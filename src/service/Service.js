/**
 * Created by alixez on 17-8-2.
 */

import models from '../models';

export default class Service {

  constructor() {
    this.modelName = '';
  }

  getModel(modelName=null) {
    if (!modelName) {
      return models[this.modelName];
    }

    return models[modelName];
  }
}