## 获取会员列表

### 接口调用说明

__请求地址 :__ [/member/list](#)

__请求方式 :__ GET

> 本接口用于向系统内部新增一个新的会员

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|status|String|在/离职状态|是|1: 在职会员 2: 离退会员|
|offset|Integer|数据偏移|否|缺省为0|
|limit|Integer|当前切片数据总数|否|缺省为20|
|search|String|搜索字段|否|-|
|other_status|Integer|按状态筛选|否|1: 困难 0: 全部|
|dept|String|按部门筛选|否|部门ID|
|deadline|String|按近期变动条数筛选|否|单位为天 比如 一周内就是7天，一月内就是30天|
|gender|String|按性别筛选|否|1:女 2:男|
|birthday|Array<String>|按生日筛选|否|数组应包含两项, 数组的第一项为开始时间第二项为结束时间 时间同样为时间毫秒数|
|type|String|按用工性质筛选|否|0: 合同制 1: 劳务制|
|integrate|Array<String>|按积分筛选|否|数组应包含两项, 数组的第一项为开始积分第二项为结束积分|

#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

#### 返回示例

```json

// 成功
{
    "code": 1000,
    "message": "获取列表成功",
    "data": {
        "total": 13,
        "users": [
            {
                "id": "3f1eb027-d72b-443b-ae1f-597f8ef56299",
                "name": "王八蛋",
                "no": 123123123,
                "birthday": "1500958503419",
                "card_num": "420114199503043719",
                "mobile": "18627894268",
                "type": 2,
                "ehr": "123123123",
                "state": 0,
                "other_status": 0,
                "gender": 1,
                "qq": "425599923",
                "wechat": "alixe",
                "degree": 0,
                "duties": "",
                "jobs": "",
                "exist_job_level": "",
                "now_job_level": "",
                "start_work_time": null,
                "join_time": null,
                "mark": "",
                "avatar": "",
                "integration": 0,
                "quit_time": null,
                "retire_time": null,
                "dept": "19530db0-159a-4223-a2b8-63448aad62a3",
                "role": "b1f14592-3914-46dd-ad08-c28499bcf777",
                "create_at": "1501040135798",
                "update_at": "1501040135798"
            }
        ]
    }
}


```

