
import ApprovalService from './ApprovalService';
import DeptService from './DeptService';
import DocService from './DocService';
import GrantApplicationService from './GrantApplicationService';
import NotificationService from './NotificationService';
import RelaxActionService from './RelaxActionService';
import RoleService from './RoleService';
import SympathyService from './SympathyService';
import ActivityService from './ActivityService';
import IntentionService from './IntentionService';
import SatisfactionSurveyService from './SatisfactionSurveyService';


export Service from './Service';

export {
  ActivityService,
  ApprovalService,
  DeptService,
  DocService,
  GrantApplicationService,
  NotificationService,
  RelaxActionService,
  RoleService,
  SympathyService,
  IntentionService,
  SatisfactionSurveyService,
}

export const registerService = () => {
  console.log('register ...');
  return {
    activity: new ActivityService(),
    approval: new ApprovalService(),
    dept: new DeptService(),
    doc: new DocService(),
    grantApplication: new GrantApplicationService(),
    notification: new NotificationService(),
    relaxAction: new RelaxActionService(),
    role: new RoleService(),
    sympathy: new SympathyService(),
    intention: new IntentionService(),
    satisfaction: new SatisfactionSurveyService(),
  }
};

export const setDataAccessToService = (services, dataAccess) => {
  const keys = Object.keys(services);
  keys.forEach(key => {
    services[key].dataAccess = dataAccess;
  });
}
