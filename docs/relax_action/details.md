## 获取疗休养详情接口

### 接口调用说明

__请求地址 :__ [/relax_action/details](#)

__请求方式 :__ GET

> 根据id获取某条疗休养的详情

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|id|string|疗休养ID|yes|-|


#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

_data 说明_

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|relax_action|dict|疗休养详情|是|-|

_ relax_action 字段说明 _

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|id|string|疗休养ID|是|-|
|no|string|疗休养序号|是|-|
|dept_id|string|疗休养所属部门|是|-|
|user_id|string|用户ID|是|-|
|title|string|主题|是|-|
|action_type|integer|组织形式|-|
|per_capita_budget|decimal|人均预算|精确到两位|
|people_number|integer|总人数|-|
|total|decimal|总金额|-|
|days|integer|天数|-|
|date|string|开始时间（时间戳）|-|
|place|string|地点|-|
|state|integer|状态|0: 草稿 1: 待处理(已提交) 2: 已完成|
|people|array<dict>|人员信息|是|详细字段说明见下表|
|department|dict|发起部门详情|是|详情见部门表|
|publisher|dict|发起人|是|详情见用户表|

_ people 人员信息表 _

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|id|string|id|yes|-|
|relax_action_id|string|关联的疗休养的ID|yes|-|
|person_category|integer|人员分类|yes|-|
|people_number|integer|人数|yes|-|


#### 返回示例

```json

{
    "code": 1000,
    "message": "查询成功",
    "data": {
        "relax_action": {
            "id": "d261a9fc-3bbf-4c9d-bbbb-ad23cdfa649a",
            "no": "2017081112105702",
            "dept_id": "6b5296f7-21e1-474c-9131-12625cbb32ac",
            "user_id": "21f89f14-9480-429f-83c9-b5f43734a032",
            "title": "标准",
            "action_type": 1,
            "per_capita_budget": "12.34",
            "people_number": 9,
            "total": "111.06",
            "days": 100,
            "date": "123123123123",
            "place": "地址",
            "state": 0,
            "apply_time": "1502424657098",
            "department": {...},
            "publisher": {...},
            "people": [
                {
                    "id": "5df1829c-5e08-4631-a286-e09a784436bf",
                    "relax_action_id": "d261a9fc-3bbf-4c9d-bbbb-ad23cdfa649a",
                    "person_category": 1,
                    "people_number": 9
                }
            ]
        }
    }
}

```

* [返回索引](../readme.md)
