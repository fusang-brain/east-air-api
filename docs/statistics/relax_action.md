## 获取疗休养统计结果接口

### 接口调用说明

__请求地址 :__ [/statistics/relax_action](#)

__请求方式 :__ GET

> 获取疗休养统计

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|offset|integer|-|no|-|
|limit|integer|-|no|-|
|start|string|筛选：开始时间|no|-|
|end|string|筛选：接受时间|no|-|


#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

_data 说明_

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|total|integer|数据总量|yes|-|
|statistic_result|Array<Dict>|统计结果|yes|dict详细字段见下表|

_ result _

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|dept_id|string|部门ID|yes|-|
|dept_name|string|部门名|yes|-|
|all_times|string|总次数|yes|-|
|total_amount|string|总金额|yes|-|
|details|Array<dict>|人员详情|yes|人员详情见下表|

_ details dict _

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|person_category|integer|人员分类|yes|-|
|people_number|string|人员总数|yes|-|



#### 返回示例

```json

{
    "code": 1000,
    "message": "查询成功",
    "data": {
        "total": 2,
        "statistic_result": [
            {
                "dept_id": "6b5296f7-21e1-474c-9131-12625cbb32ac",
                "dept_name": "部门2",
                "all_times": "10",
                "all_people": "126",
                "total_amount": "1554.84",
                "details": [
                    {
                        "person_category": 1,
                        "people_number": "90"
                    },
                    {
                        "person_category": 2,
                        "people_number": "18"
                    },
                    {
                        "person_category": 3,
                        "people_number": "18"
                    }
                ]
            },
            {
                "dept_id": "d2f222c1-d652-460e-bb05-2b306e512449",
                "dept_name": "机关分会",
                "all_times": "4",
                "all_people": "36",
                "total_amount": "444.24",
                "details": [
                    {
                        "person_category": 1,
                        "people_number": "36"
                    }
                ]
            }
        ]
    }
}
```

* [返回索引](../readme.md)
