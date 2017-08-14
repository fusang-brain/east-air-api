## 获取慰问统计结果接口

### 接口调用说明

__请求地址 :__ [/statistics/sympathy](#)

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
|sympathy_result|Array<Dict>|统计结果|yes|dict详细字段见下表|

_ result _

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|dept_id|string|部门ID|yes|-|
|dept_name|string|部门名|yes|-|
|all_times|string|总次数|yes|-|
|people_total|string|慰问总人数|yes|-|
|total_amount|string|慰问总金额|yes|-|
|good_total_amount|string|慰问商品总金额|-|
|details|Array<dict>|慰问人员详情展开|-|

_ details dict _

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|sympathy_type|integer|人员分类|yes|0：未知 1:困难 2:生病 3:一线员工|
|person_num|string|人员总数|yes|-|



#### 返回示例

```json

{
    "code": 1000,
    "message": "查看成功",
    "data": {
        "total": "1",
        "statistic_result": [
            {
                "dept_id": "2134a673-233d-4f3f-bc18-c68123ce1ea5",
                "dept_name": "部门2",
                "all_times": "11",
                "people_total": "22",
                "total_amount": "1353.00",
                "good_total_amount": "2574.00",
                "details": [
                    {
                        "sympathy_type": 1,
                        "person_num": "22"
                    }
                ]
            }
        ]
    }
}
```

* [返回索引](../readme.md)
