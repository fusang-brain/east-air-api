
import Service from './Service';
import Decimal from 'decimal.js';
import Response from '../config/response';

export default class SympathyService extends Service {

  constructor() {
    super();
    this.modelName = 'Sympathy';
    this.Sympathy = this.getModel();
  }

  async create(args) {

    args.sympathy_cost = new Decimal(+args.sympathy_cost).toNumber();
    args.sympathy_good_cost = new Decimal(+args.sympathy_good_cost).toNumber();
    args.apply_time = Date.now().toString();
    return await this.Sympathy.create(args);
  }

  async update(params) {
    const {id, ...args} = params;

    const foundSympathy = await this.Sympathy.findOne({where: {id, dept_id: {$in: this.dataAccess}}});
    if (![0, 3].includes(foundSympathy.state)) {
      throw {
        code: Response.getErrorCode(),
        message: '本资源不能被修改',
      }
    }

    args.sympathy_cost = new Decimal(+args.sympathy_cost).toNumber();
    args.sympathy_good_cost = new Decimal(+args.sympathy_good_cost).toNumber();
    const updatedSympathy = await this.Sympathy.update(args, {
      where: {id},
    });

    return foundSympathy
  }

  async generateList({offset, limit, state, reason}) {
    let condition = {
      dept_id: {
        $in: this.dataAccess,
      }
    };
    switch (state) {
      case 'draft':
        condition.state = 0;
        break;
      case 'pending':
        condition.state = 1;
        break;
      case 'success':
        condition.state = 2;
        break;
      case 'fail':
        condition.state = 3;
        break;
      default:
        break;
    }
    if (reason) {
      condition.reason = {
        $like: `%${reason}%`
      }
    }

    const total = await this.Sympathy.count({
      where: condition,
    });
    const list = await this.Sympathy.all({
      attributes: ['id', 'reason', 'person', 'sympathy_date', 'apply_time', 'state', 'person_num', 'sympathy_cost', 'sympathy_type'],
      where: condition,
      offset,
      limit,
      include: [
        {
          model: this.getModel('Dept'),
          as: 'department',
        }
      ],
      order: [
        ['apply_time', 'DESC'],
      ]
    });

    return {list, total};

  }

  async remove(id) {
    const foundTheSympathy = await this.Sympathy.findOne({
      where: {
        id: id,
        dept_id: {$in: this.dataAccess}
      }
    });
    const Approval = this.getModel('Approval');
    const ApprovalFlows = this.getModel('ApprovalFlows');

    if (!foundTheSympathy) {
      throw {
        code: Response.getErrorCode(),
        message: '该资源不存在',
      }
    }

    if (![0, 3].includes(foundTheSympathy.state)) {
      throw {
        code: Response.getErrorCode(),
        message: '本资源不可被删除',
      }
    }

    const foundApproval = await Approval.findOne({where: {project_id: foundTheSympathy.id}});

    await this.Sympathy.destroy({where: {id: id}});
    await Approval.destroy({where: {project_id: id}});
    if (foundApproval) {
      await ApprovalFlows.destroy({where: {approval_id: foundApproval.id}});
    }

    return true;
  }

  async details(id) {
    console.log(this.dataAccess);
    return await this.Sympathy.findOne({
      where: {
        id,
        dept_id: {
          $in: this.dataAccess,
        }
      },
      include: [
        {
          model: this.getModel('User'),
          as: 'publisher',
          attributes: ['id', 'name', 'avatar'],
        },
        {
          model: this.getModel('Dept'),
          as: 'department',
        }
      ]
    });
  }

  async statisticsResultTotal(duration) {
    const dataAccessStr = this.dataAccess.join("','");
    const conditionArr = [];
    let condition = `WHERE `;
    conditionArr.push(`syp.dept_id IN ('${dataAccessStr}')`);
    conditionArr.push(`syp.state = 2`)

    if (duration && duration.start) {
      conditionArr.push(`syp.sympathy_date >= '${duration.start}'`);
    }

    if (duration && duration.end) {
      conditionArr.push(`syp.sympathy_date <= '${duration.end}'`);
    }

    condition += conditionArr.join(' AND ');
    condition += ' ';

    const queryStr = "SELECT COUNT(*) as total FROM (SELECT syp.dept_id " +
      "FROM `" + this.getModel().tableName + "` as syp " +
      condition +
      "GROUP BY syp.dept_id) res";
    const res = await this.connect.query(queryStr, {
      type: this.sequelize.QueryTypes.SELECT,
    });

    return res[0].total;
  }

  async statisticsResult(offset=0, limit=20, duration) {

    const dataAccessStr = this.dataAccess.join("','");
    const conditionArr = [];
    let condition = `WHERE `;
    conditionArr.push(`syp.dept_id IN ('${dataAccessStr}')`);
    conditionArr.push(`syp.state = 2`)

    if (duration && duration.start) {
      conditionArr.push(`syp.sympathy_date >= '${duration.start}'`);
    }

    if (duration && duration.end) {
      conditionArr.push(`syp.sympathy_date <= '${duration.end}'`);
    }

    condition += conditionArr.join(' AND ');
    condition += ' ';

    let queryStr = "SELECT " +
      "syp.dept_id as dept_id, (SELECT dept_name FROM " + this.getModel('Dept').tableName + " WHERE id=dept_id) as dept_name, COUNT(syp.id) as all_times, SUM(syp.person_num) as people_total, SUM(syp.sympathy_cost) as total_amount, SUM(syp.sympathy_good_cost) as good_total_amount " +
      "FROM `" + this.getModel().tableName + "` as syp " +
      condition +
      //"LEFT JOIN `" + this.getModel('Dept').tableName+"` as dept ON dept.id = ra.dept_id " +
      "GROUP BY syp.dept_id ";
    let replacements = {};

    if (offset !== null && limit !== null) {
      queryStr += 'LIMIT :offset,:limit ';
      replacements = {
        offset,
        limit,
      }
    }

    return await this.connect.query(
      queryStr,
      {
        replacements,
        type: this.sequelize.QueryTypes.SELECT,
      }
    );
  }

  async statisticsDetails(duration) {

    const dataAccessStr = this.dataAccess.join("','");
    const conditionArr = [];
    let condition = `WHERE `;
    conditionArr.push(`syp.dept_id IN ('${dataAccessStr}')`);
    conditionArr.push(`syp.state = 2`)

    if (duration && duration.start) {
      conditionArr.push(`syp.sympathy_date >= '${duration.start}'`);
    }

    if (duration && duration.end) {
      conditionArr.push(`syp.sympathy_date <= '${duration.end}'`);
    }

    condition += conditionArr.join(' AND ');
    condition += ' ';

    return await this.connect.query(
      "SELECT " +
      "syp.dept_id as dept_id, syp.sympathy_type as sympathy_type, SUM(syp.person_num) as person_num " +
      "FROM `" + this.getModel().tableName + "` as syp " +
      condition +
      "GROUP BY syp.dept_id, sympathy_type ",
      {
        type: this.sequelize.QueryTypes.SELECT,
      }
    )
  }

}