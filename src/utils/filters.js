/**
 * Created by alixez on 17-6-22.
 */
import response from '../config/response';

const validate = {
  keep: value => true,
  required: value => typeof value !== 'undefined',
  array: Array.isArray,
  integer: Number.isInteger,
  string: value => typeof value === 'string',
};

const validateMessage = (key) => ({
  required: `${key} 参数不能为空`,
  array: `${key} 参数接收一个数组`,
  integer: `${key} 参数必须是数字类型`,
  string: `${key} 参数必须是一个字符串`,
});

function judgeAndFilter(rule, value, key) {
  if (!validate[rule](value)) {
    throw response.errorResp(validateMessage(key)[rule]);
  }
  return {[key]: value};
}

const filterHandlers = {
  string: judgeAndFilter,
  object: (rules, value, key) => filterParams(value, rules),
};



export function filterParams(args, rules) {

  const res = Object.keys(rules).map(key => {
    if (typeof args[key] === 'undefined') {
      const rulesIsArray = Array.isArray(rules[key]);
      if (rulesIsArray && !rules[key].includes('required')) {
        rules[key] = 'keep';
      } else if (!rulesIsArray && rules[key] !== 'required') {
        rules[key] = 'keep';
      }
    }

    console.log(`log${key}`, rules[key]);

    if (Array.isArray(rules[key])) {
      // 依次读取规则进行过滤
      return rules[key].map(rule => filterHandlers[typeof rule](rule, args[key], key))
    } else {
      return filterHandlers[typeof rules[key]](rules[key], args[key], key);
    }
  });

  const result = res.reduce((lastResult, loop) => {
    const value = Array.isArray(loop) ? loop[0] : loop;
    Object.assign(lastResult, value);
    return lastResult;
  });

  console.log(result);
  return args;
}