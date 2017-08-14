## 修改慰问接口

### 接口调用说明

__请求地址(草稿) :__ [/sympathy/update/draft](#)

__请求地址(提交):__ [/sympathy/update/submit](#)

__请求方式 :__ POST

> 修改慰问接口

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|id|string|慰问ID|yes|-|
|reason|string|慰问原因|no|-|
|person|string|慰问人|no|-|
|dept_id|string|部门ID|no|-|
|sympathy_date|string|慰问日期|no|-|
|sympathy_cost|number|慰问金额|no|-|
|sympathy_good_cost|number|慰问品金额|no|-|
|sympathy_type|integer|慰问类型|no|-|
|person_num|integer|人数|no|-|


#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|



#### 请求示例

```json
{
  "id": "7d2a37b7-5cd1-451f-8c57-2a1d10e0dad1",
  "reason": "原因",
  "person": "lalal-修改",
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
  "message": "修改成功",
}

```

* [返回索引](../readme.md)
