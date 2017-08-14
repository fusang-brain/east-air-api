## 发起慰问接口

### 接口调用说明

__请求地址(保存草稿) :__ [/sympathy/create/draft](#)

__请求地址(发起审批):__[/sympathy/create/submit](#)

__请求方式 :__ POST

> 发起慰问

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|reason|string|慰问原因|yes|-|
|person|string|慰问人|yes|-|
|dept_id|string|部门ID|no|-|
|sympathy_date|string|慰问日期|yes|-|
|sympathy_cost|number|慰问金额|yes|-|
|sympathy_good_cost|number|慰问品金额|yes|-|
|sympathy_type|integer|慰问类型|yes|-|
|person_num|integer|人数|yes|-|


#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

_data 说明_

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|sympathy|dict|慰问详情|yes|-|


#### 请求示例

```json
{
  "reason": "",
  "person": "lalal",
  "sympathy_date": "1502584106001",
  "sympathy_cost": 123,
  "sympathy_good_cost": 234,
  "sympathy_type": 1,
  "person_num": 2
}
```

#### 返回示例

```json
{
    "code": 1000,
    "message": "创建成功",
    "data": {
        "sympathy": {
            "id": "f3b2761a-fb1b-402b-b960-f9ea759cd475",
            "reason": "",
            "person": "lalal",
            "sympathy_date": "1502584106001",
            "sympathy_cost": 123,
            "sympathy_good_cost": 234,
            "sympathy_type": 1,
            "person_num": 2,
            "dept_id": "2134a673-233d-4f3f-bc18-c68123ce1ea5",
            "user_id": "aee52788-3c41-441b-8cee-e6022f54d83f",
            "state": 1,
            "apply_time": "1502685363552"
        }
    }
}

```

* [返回索引](../readme.md)
