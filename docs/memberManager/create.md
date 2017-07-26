## 新增会员

### 接口调用说明

__请求地址 :__ [/member/create](#)

__请求方式 :__ POST

> 本接口用于向系统内部新增一个新的会员

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|name|String|姓名|是|-|
|gender|Integer|性别|是|0: 未知 1:女 2:男|
|birthday|String|生日|是|unix时间戳（时间毫秒数）|
|card_num|String|身份证|是|-|
|mobile|String|手机号|是|-|
|ehr|String|员工关系编号|是|-|
|dept|String|部门ID|是|-|
|role|String|角色ID|是|-|
|data_access|Array<String>|数据权限|否|若不传此字段则缺省当前用户的部门|
|state|Integer|状态|是|1: 在职, 2: 离职,3: 退休, 0:其他|
|no|Integer|卡号|是|-|
|type|Integer|用工性质|是|0: 合同制 1: 劳务制|
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
	"name": "王八蛋",
	"gender": 1,
	"birthday": "1500958503419",
	"card_num": "420114199503043719",
	"mobile": "18627894269",
	"ehr": "123123123",
	"dept": "19530db0-159a-4223-a2b8-63448aad62a3",
	"role": "b1f14592-3914-46dd-ad08-c28499bcf777",
	"state": 0,
	"data_access": [
		"19530db0-159a-4223-a2b8-63448aad62a3"
	],
	"no": 123123123,
	"type": 2,
	"qq": "425599923",
	"wechat": "alixe"
	...
}
```

#### 返回示例

```json

// 创建成功
{
    "code": 1004,
    "message": "创建成功",
    "data": {
        "created_user": {
            "id": "3f1eb027-d72b-443b-ae1f-597f8ef56299",
            "other_status": 0,
            "degree": 0,
            "duties": "",
            "jobs": "",
            "exist_job_level": "",
            "now_job_level": "",
            "mark": "",
            "avatar": "",
            "integration": 0,
            "deleted": false,
            "create_at": 1501040135798,
            "update_at": 1501040135798,
            "name": "王八蛋",
            "gender": 1,
            "birthday": "1500958503419",
            "card_num": "420114199503043719",
            "mobile": "18627894268",
            "ehr": "123123123",
            "dept": "19530db0-159a-4223-a2b8-63448aad62a3",
            "role": "b1f14592-3914-46dd-ad08-c28499bcf777",
            "state": 0,
            "no": 123123123,
            "type": 2,
            "qq": "425599923",
            "wechat": "alixe",
            "password": "$2a$08$HHnJ1GGI8z3q2awqq8JVxOeQKbuVfYuLR97840P6tws/qWwR.Dmoq"
        }
    }
}

// 创建失败
{
    "code": 2004,
    "message": "该手机号已经存在"
}


```

