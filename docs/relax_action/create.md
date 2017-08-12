## 创建疗休养接口

### 接口调用说明

__请求地址 :__ [/relax_action/create](#)

__请求方式 :__ POST

> 创建疗休养接口

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|title|string|主题|yes|-|
|action_type|integer|组织形式|yes|0-未知 1-自行 2-委托|
|per_capita_budget|number|人均预算|yes|-|
|days|integer|天数|yes|-|
|date|string|开始时间（疗休养时间）|yes|13位时间戳|
|place|string|疗休养地点|yes|-|
|people|Array<dict>|疗休养详情项目|yes|详情见下表|

_people 项目字段说明_

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|person_category|integer|人员类型|yes|人员类别 0:机务人员 1:有毒有害工作人员 2:康复人员 3:先进人员 4:献血人员 5:管理人员技术人员 6:职工 7:劳务工|
|people_number|integer|人数|yes|-|



#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

_data 说明_

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|relax_action|dict|创建好的疗休养|-|


#### 请求示例

```json
{
	"title": "标准2草稿",
	"action_type": 1,
	"per_capita_budget": 12.34,
	"days": 100,
	"date": "123123123123",
	"place": "地址",
	"people": [
		{
			"person_category": 1,
			"people_number": 9
		},
		{
			"person_category": 2,
			"people_number": 9
		},
		{
			"person_category": 3,
			"people_number": 9
		}
	]
}
```

#### 返回示例

```json
{
    "code": 1000,
    "message": "创建成功",
    "data": {
        "relax_action": {
            "id": "ee012b1d-a51e-40e0-bb0f-4b256552042e",
            "no": "2017081116323901",
            "title": "标准2草稿",
            "action_type": 1,
            "per_capita_budget": 12.34,
            "days": 100,
            "date": "123123123123",
            "place": "地址",
            "people": [
                {
                    "id": "cc4904af-d1b5-4289-ab09-1e9caa4ef831",
                    "person_category": 1,
                    "people_number": 9,
                    "relax_action_id": "ee012b1d-a51e-40e0-bb0f-4b256552042e"
                },
                {
                    "id": "aca0adb1-cb34-4da3-841f-5965a4d19de5",
                    "person_category": 2,
                    "people_number": 9,
                    "relax_action_id": "ee012b1d-a51e-40e0-bb0f-4b256552042e"
                },
                {
                    "id": "8a3f0cd7-2dbf-43ee-9300-bac193082f7f",
                    "person_category": 3,
                    "people_number": 9,
                    "relax_action_id": "ee012b1d-a51e-40e0-bb0f-4b256552042e"
                }
            ],
            "state": 0,
            "people_number": 27,
            "total": 333.18,
            "apply_time": 1502440359257,
            "dept_id": "6b5296f7-21e1-474c-9131-12625cbb32ac",
            "user_id": "21f89f14-9480-429f-83c9-b5f43734a032"
        }
    }
}

```

* [返回索引](../readme.md)
