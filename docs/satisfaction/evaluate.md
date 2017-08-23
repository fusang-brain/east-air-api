## 满意度评价接口

### 接口调用说明

__请求地址 :__ [/satisfaction/evaluate](#)

__请求方式 :__ POST

> 接口描述...

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|survey_id|string|调查id|是|-|
|satisfaction_level|string|评价等级|是|'very_satisfied': 非常满意 'satisfied': 满意 'not_satisfied': 不满意|
|options|string|评价意见|是|-|
|tags|array<string>|标签|否|当评价等级为不满意时，此项为必填项|


#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

_data 说明_

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|


#### 请求示例

```json

{
	"survey_id": "8ec7a090-32a6-46b8-b66f-9a2af620850a",
	"satisfaction_level": "not_satisfied",
	"options": "提个建议哦",
	"tags": [
		"口味", "卫生"
	]
}

```

#### 返回示例

```json

{
    "code": 1000,
    "message": "评价成功"
}

```

* [返回索引](../readme.md)
