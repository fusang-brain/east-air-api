
**用户表**

|字段|类型|说明|备注|
|-|-|-|-|
|id|UUID|标识|unique, primary key|
|name|String(50)|用户姓名|-|
|birthday|String|生日|-|
|no|String|卡号|-|
|card_num|String|身份证号|-|
|mobile|String|手机号|
|type|Integer|用工性质|0: 合同制 1: 劳务制|
|ehr|String|EHR|-|
|password|String(256)|密码|hash(sha1) 并大写后，采用crypt加密|
|state|Integer|状态|1: 在职, 2: 离职,3: 退休, 0:其他|
|other_status|Integer|其他状态|0: 正常, 1: 困难|
|gender|Integer|性别|0: 未知 1:女 2:男|
|qq|String|qq号码|-|
|wechat|String|微信号|-|
|degree|Integer|学位|0: ...|
|duties|String|职称|-|
|jobs|String|岗位(职务)|-|
|exist_job_level|String|实设岗级|-|
|now_job_level|String|现岗级|-|
|start_work_time|String|参加工作时间|-|
|join_time|String|入职时间|-|
|mark|String|备注|-|
|avatar|String|头像地址|-|
|integration|Integer|积分|-|
|quit_time|String|离职时间|-|
|retire_time|String|退休时间|-|
|dept|UUID|部门标识|-|
|role|UUID|角色标识|-|
|deleted|Boolean|是否已经删除|-|
|create_at|String|记录创建时间|-|
|update_at|String|记录最近的更新时间|-|