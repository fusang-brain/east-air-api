/**
 * Created by alixez on 17-8-2.
 */
import {sequelize, Sequelize} from '../models'
import models from '../models';

export default class Service {

  constructor() {
    this.modelName = '';
    this.connect = sequelize;
    this.sequelize = Sequelize;
  }

  getModel(modelName=null) {
    if (!modelName) {
      return models[this.modelName];
    }

    return models[modelName];
  }
}