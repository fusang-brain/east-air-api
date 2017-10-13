## 1.场地统计接口

### 接口调用说明

__请求地址 :__ [/satisfaction/statistics/site](#)

__请求方式 :__ GET

> 接口描述...

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|id|string|满意度调查id|yes|-|
|filter_by|string|筛选(周，月，年，季度)|no|week, month, year, quarterly|
|filter_dept|string|部门id|no|通过部门筛选|
|to_heavy|string|是否去重复|no|yes: 去重复 no: 不去重复|


#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

_data 说明_

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|



#### 返回示例

```json

{
    "code": 1000,
    "message": "获取成功",
    "data": {
        "results": [
            {
                "evaluate_week": "34",   // 周数
                "evaluate_month": "8",   // 月份
                "evaluate_year": "2017", // 年份
                "evaluate_quarter": "3", // 季度
                "vote_count": 1,         // 总票数 (人次)
                "people_count": 1,       // 投票总人数
                "satisfied_people_count": 0, // 满意人数
                "very_satisfied_count": 0,   // 非常满意的票数 
                "very_satisfied_rate": 0,    // 非常满意的投票率 (%)
                "satisfied_count": 0,        // 满意的投票数
                "satisfied_rate": 0,         // 满意的投票率     (%)
                "not_satisfied_count": 1,    // 不满意的票数
                "not_satisfied_rate": 100,   // 不满意的投票率    (%)
                "tags_count": {              // 标签总数
                    "流程": 1,
                    "态度": 1
                },
                "tags_rate": {               // 标签比例分布(%)
                    "流程": 50,
                    "态度": 50
                },
                "tags_total": 2             // 标签总票数
            }
        ]
    }
}
```


## 2.人员统计接口

### 接口调用说明

__请求地址 :__ [/satisfaction/statistics/person](#)

__请求方式 :__ GET

> 接口描述...

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|id|string|满意度调查id|yes|-|
|filter_by|string|筛选(周，月，年，季度)|no|week, month, year, quarterly|
|dept_id|string|部门id|no|查询某个部门的投票结果(若此字段不为空，则id字段无效)|


#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

_data 说明_

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|



#### 返回示例

```json

{
    "code": 1000,
    "message": "获取成功",
    "data": {
        "results": [
            {
                "evaluate_week": "34",   // 周数
                "evaluate_month": "8",   // 月份
                "evaluate_year": "2017", // 年份
                "evaluate_quarter": "3", // 季度
                "vote_count": 1,         // 总票数 (人次)
                "people_count": 1,       // 投票总人数
                "satisfied_people_count": 0, // 满意人数
                "very_satisfied_count": 0,   // 非常满意的票数 
                "very_satisfied_rate": 0,    // 非常满意的投票率 (%)
                "satisfied_count": 0,        // 满意的投票数
                "satisfied_rate": 0,         // 满意的投票率     (%)
                "not_satisfied_count": 1,    // 不满意的票数
                "not_satisfied_rate": 100,   // 不满意的投票率    (%)
                "tags_count": {              // 标签总数
                    "流程": 1,
                    "态度": 1
                },
                "tags_rate": {               // 标签比例分布(%)
                    "流程": 50,
                    "态度": 50
                },
                "tags_total": 2             // 标签总票数
            }
        ]
    }
}
```

## 3.最近一周场地统计接口

### 接口调用说明

__请求地址 :__ [/satisfaction/week_statistics/site](#)

__请求方式 :__ GET

> 接口描述...

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|id|string|满意度调查id|yes|-|

#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

_data 说明_

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|



#### 返回示例

```json

{
    "code": 1000,
    "message": "查询成功",
    "data": {
        "results": {
            // 周分布趋势数据 (数组第0项为星期日 ，数组第6项为星期6。单位为 % )
            "week_distribute_rate": [
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            
            // 饼状分布图
            "pie_chart": {
                
                "total": 1,   // 总数
                
                // 满意
                "satisfied": {
                    "total": 0,
                    "rate": 0      // (%)
                },
                
                // 非常满意
                "very_satisfied": {
                    "total": 0,
                    "rate": 0    // (%)
                },
                
                // 不满意
                "not_satisfied": {
                    "total": 1,
                    "rate": 100  // (%)
                }
            }
        }
    }
}
```

## 4.最近一周人员统计接口

### 接口调用说明

__请求地址 :__ [/satisfaction/week_statistics/person](#)

__请求方式 :__ GET

> 接口描述...

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|id|string|满意度调查id|no|-|
|dept_id|string|部门id|no|查询某个部门的统计结果,若此字段不为空，则id字段无效|

#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

_data 说明_

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|



#### 返回示例

```json

{
    "code": 1000,
    "message": "查询成功",
    "data": {
        "results": {
            // 周分布趋势数据 (数组第0项为星期日 ，数组第6项为星期6。单位为 % )
            "week_distribute_rate": [
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            
            // 饼状分布图
            "pie_chart": {
                
                "total": 1,   // 总数
                
                // 满意
                "satisfied": {
                    "total": 0,
                    "rate": 0      // (%)
                },
                
                // 非常满意
                "very_satisfied": {
                    "total": 0,
                    "rate": 0    // (%)
                },
                
                // 不满意
                "not_satisfied": {
                    "total": 1,
                    "rate": 100  // (%)
                }
            }
        }
    }
}
```


* [返回索引](../readme.md)
