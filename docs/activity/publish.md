## 发起活动接口

### 接口调用说明

__请求地址 :__ [/activity/publish](#)

__请求方式 :__ POST

> 发起一个活动

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|act_type|integer|活动类型|是|0: 职工教育 1:文体活动 2:宣传活动 3:其他活动 4:送温暖 5:培训 6:会议 7:专项会议 8:其他业务|
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
|items|Array<details>|经费明细|否|当经费类型为　7:固定资产时　存在本字段, 详情见下表(经费明细)|
|cost|Float|申请经费|否|金额,精确到分。Decimal(10,2)|
|purpose|String|目标|否|-|
|people_count|Integer|活动人数|-|

__活动预算__

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|project|String|项目|是|-|
|cost|String|预算金额|是|-|

__经费明细__

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|name|String|资产名称|是｜－｜
|price|Number|单价|是|－|
|count|Integer|数量|是|－|


#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

#### 请求示例

```json

// 普通类型
{
	"act_type": 1,
	"subject": "主题",
	"purpose": "目的",
	"target": "活动对象",
	"address": "活动地点",
	"start_date": "1231313123123",
	"end_date": "1231313123",
	"process": "sadfasfasfasdf",
	"integration": 1,
	"grant_apply": {
		"type": 1,
		"dept_id": "5a7b9ec2-0352-4588-ae64-a610efd583b3",
		"cost": 123.23,
		"purpose": "123123123",
		"people_count": 2
	},
	"budgets": [
		{
			"project": "asdfasfasdf",
			"cost": 123.99
		},{
			"project": "sadfasfdasf",
			"cost": 32.54
		}
	],
	"images": [
		"/file/1501232252297-dvv7g9iuw597f6hy15x9a4i.png",
		"/file/1501232271380-cp4j9tfuzc03g3u7kfbt9.png"
	],
	"attach": [
	    "/file/1501232271380-cp4j9tfuzc03g3u7kfbt9.png"
	]
}

// 固定资产
{
	"act_type": 1,
	"subject": "主题",
	"purpose": "目的",
	"target": "活动对象",
	"address": "活动地点",
	"start_date": "1231313123123",
	"end_date": "1231313123",
	"process": "活动明细流程",
	"integration": 1,
	"grant_apply": {
		"type": 1,
		"dept_id": "5a7b9ec2-0352-4588-ae64-a610efd583b3",
		"cost": 123.23,
		"items": [
		  {
        "name": "固定资产明细",
        "price": 123.88,
        "count": 2
      },{
        "name": "固定资产明细2",
        "price": 123.89,
        "count": 2
      }
		],
		"purpose": "123123123",
		"people_count": 2
	},
	"budgets": [
		{
			"project": "asdfasfasdf",
			"cost": 123.99
		},{
			"project": "sadfasfdasf",
			"cost": 32.54
		}
	],
	"images": [
		"/file/1501232252297-dvv7g9iuw597f6hy15x9a4i.png",
		"/file/1501232271380-cp4j9tfuzc03g3u7kfbt9.png"
	],
	"attach": [
	    "/file/1501232271380-cp4j9tfuzc03g3u7kfbt9.png"
	]
}

```

#### 返回示例

```json

{
    "code": 1004,
    "message": "发布成功",
    "data": {
        "act": {
            "id": "ef975387-0813-4bf5-9c91-aab03009cef5",
            "create_date": 1501235609214,
            "deleted": false,
            "act_type": 1,
            "subject": "主题",
            "purpose": "目的",
            "target": "活动对象",
            "address": "活动地点",
            "start_date": "1231313123123",
            "end_date": "1231313123",
            "process": "sadfasfasfasdf",
            "integration": 1,
            "grant_apply": {
                "id": "6514fd2c-8589-4928-98ef-a3015e100616",
                "type": 1,
                "dept_id": "5a7b9ec2-0352-4588-ae64-a610efd583b3",
                "cost": 123.23,
                "purpose": "123123123",
                "people_count": 2
            },
            "budget_total": 156.53,
            "budgets": [
                {
                    "id": "6385ce52-dfe5-45bf-a907-fdb3d16dbcb3",
                    "project": "asdfasfasdf",
                    "cost": 123.99,
                    "act_id": "ef975387-0813-4bf5-9c91-aab03009cef5"
                },
                {
                    "id": "2871d82e-d6c9-482e-ace2-b626a39dc5a3",
                    "project": "sadfasfdasf",
                    "cost": 32.54,
                    "act_id": "ef975387-0813-4bf5-9c91-aab03009cef5"
                }
            ],
            "images": [
                {
                    "id": "2475d6f1-02b1-4d30-8671-073e78fa1d20",
                    "file_path": "/file/1501232252297-dvv7g9iuw597f6hy15x9a4i.png",
                    "no": 1,
                    "act_id": "ef975387-0813-4bf5-9c91-aab03009cef5"
                },
                {
                    "id": "24e512a6-4442-4654-b789-e86c40c7be07",
                    "file_path": "/file/1501232271380-cp4j9tfuzc03g3u7kfbt9.png",
                    "no": 1,
                    "act_id": "ef975387-0813-4bf5-9c91-aab03009cef5"
                }
            ],
            "attach": [
                {
                    "id": "464d8be0-4303-4ff3-b2d0-20e69293195a",
                    "file_path": "/file/1501232271380-cp4j9tfuzc03g3u7kfbt9.png",
                    "no": 1,
                    "act_id": "ef975387-0813-4bf5-9c91-aab03009cef5"
                }
            ],
            "grant_apply_id": "6514fd2c-8589-4928-98ef-a3015e100616"
        }
    }
}

```

* [返回索引](../readme.md)

