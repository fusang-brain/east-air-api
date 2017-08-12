
import Service from './Service';
import Decimal from 'decimal.js';

export default class SympathyService extends Service {

  constructor() {
    super();
    this.modelName = 'Sympathy';
    this.Sympathy = this.getModel();
  }

  async create(args) {
    return await this.Sympathy.create(args);
  }

  async update(args) {}

}