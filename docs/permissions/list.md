## 获取权限列表接口

### 接口调用说明

__请求地址 :__ [/permission/list](#)

__请求方式 :__ GET

> 获取权限列表接口

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
| | | | | |


#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

#### 返回示例

```json

{
  "code": 1000,
  "message": "查看成功",
  "data": {
    "list": [
      {
        "id": "156fd36d-e650-4705-95a5-14b6f901aa7d", // 模块ID
        "name": "积分兑换",                            // 上层模块名
        "slug": "redeem_integration",                 // 模块键
        "permission": [
          {
            "id": "0447b89d-a1ea-45ea-9697-f6c3b79c7cc6",        // 权限ID
            "module_id": "156fd36d-e650-4705-95a5-14b6f901aa7d", // 权限所属模块ID
            "name": "移除积分商品",                                // 权限名
            "slug": "remove_goods"                               // 权限键
          },
          {
            "id": "3b2fbc30-2373-4daa-ae6b-a2d63ef6c5e2",
            "module_id": "156fd36d-e650-4705-95a5-14b6f901aa7d",
            "name": "下架积分商品",
            "slug": "stop_goods"
          },
          {
            "id": "3f73b2ae-c31a-43e2-a7bf-5cdfa808e5f8",
            "module_id": "156fd36d-e650-4705-95a5-14b6f901aa7d",
            "name": "兑换商品",
            "slug": "redeem_goods"
          },
          {
              "id": "77788115-2163-4748-a600-9bff533ca2d8",
              "module_id": "156fd36d-e650-4705-95a5-14b6f901aa7d",
              "name": "查看积分详情",
              "slug": "view_integration_detail"
          },
          {
              "id": "8699fd03-5deb-4996-88fb-cc471b23b89a",
              "module_id": "156fd36d-e650-4705-95a5-14b6f901aa7d",
              "name": "查看兑换明细",
              "slug": "view_redeem_detail"
          },
          {
              "id": "9f63bcd1-2b97-44e0-bce0-d65fff54e1c4",
              "module_id": "156fd36d-e650-4705-95a5-14b6f901aa7d",
              "name": "上架积分商品",
              "slug": "publish_goods"
          },
          {
              "id": "a01e6afc-caba-4d01-9577-ff66ac580c16",
              "module_id": "156fd36d-e650-4705-95a5-14b6f901aa7d",
              "name": "新增积分商品",
              "slug": "create_goods"
          },
          {
              "id": "ebc9495b-631e-40dc-a5fc-17d9d36909fa",
              "module_id": "156fd36d-e650-4705-95a5-14b6f901aa7d",
              "name": "确认商品兑换",
              "slug": "confirm_redeem"
          }
        ]
      }
    ]
  }
}

```

