## 修改会员

### 接口调用说明

__请求地址 :__ [/member/update](#)

__请求方式 :__ POST

> 本接口用于向系统内部修改一个会员的会员信息

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|user|String|用户ID|是|-|
|name|String|姓名|否|-|
|gender|Integer|性别|否|0: 未知 1:女 2:男|
|birthday|String|生日|否|unix时间戳（时间毫秒数）|
|card_num|String|身份证|否|-|
|mobile|String|手机号|否|-|
|ehr|String|员工关系编号|否|-|
|dept|String|部门ID|否|-|
|role|String|角色ID|否|-|
|data_access|Array<String>|数据权限|否|若不传此字段则缺省当前用户的部门|
|state|Integer|状态|否|1: 在职, 2: 离职,3: 退休, 0:其他|
|no|Integer|卡号|否|-|
|type|Integer|用工性质|否|0: 合同制 1: 劳务制|
|qq|String|QQ|否|-|
|wechat|String|微信号|否|-|
|degree|Integer|学历|否|0: 未知 1:专科 2:本科 3:硕士 4:博士|
|duties|String|职称|否|-|
|jobs|String|职位|否|-|
|exist_job_level|String|实设岗级|否|-|
|now_job_level|String|现岗级|否|-|
|start_work_time|String|开始工作时间|否|unix时间戳(时间毫秒数)|
|join_time|String|入职时间|否|unix时间戳(时间毫秒数)|
|integration|Integer|积分|否|-|
|mark|String|备注|否|-|

#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

#### 请求示例

```json
{
	"user": "3f1eb027-d72b-443b-ae1f-597f8ef56299",
	"name": "王八蛋~~~",
	"gender": 1,
	"qq": "425599923",
	"wechat": "alixeXX"
}
```

#### 返回示例

```json

{
    "code": 1001,
    "message": "修改成功"
}

```

