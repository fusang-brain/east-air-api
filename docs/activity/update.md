## 修改活动

### 接口调用说明

__请求地址 :__ [/activity/update](#)

__请求方式 :__ POST

> 修改活动

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|act_id|string|活动ID|是|-|
|act_type|integer|活动类型|是|-|
|subject|string|活动主题|是|-|
|purpose|string|活动目的|是|-|
|target|string|活动对象|是|-|
|address|string|活动地址|是|-|
|start_date|string|开始时间|是|时间毫秒数|
|end_date|string|结束时间|是|时间毫秒数|
|process|string|活动流程|是|-|
|integration|integer|活动积分|否|-|
|grant_apply|object|活动经费申请|否|详情见下表|
|budgets|object|活动预算|是|详情见下表|
|images|Array|活动图片|否|本字段是一个数组，数组的每一项的值来自上传文件是返回的file_path。请看上传接口的返回结果|
|attach|Array|活动附件|否|本字段是一个数组，数组的每一项的值来自上传文件是返回的file_path。请看上传接口的返回结果|

__活动经费申请__

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|type|Integer|经费类型|否|-|
|dept_id|String|部门ID|否|-|
|cost|Float|申请经费|否|金额,精确到分。Decimal(10,2)|
|purpose|String|目标|否|-|
|people_count|Integer|活动人数|-|

__活动预算__

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|project|String|项目|是|-|
|cost|String|预算金额|是|-|

#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

#### 返回示例

```json
{
    "code": 2000,
    "message": "活动修改失败"
}

{
    "code": 1001,
    "message": "活动修改成功"
}
```

* [返回索引](../readme.md)

