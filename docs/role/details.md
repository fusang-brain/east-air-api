## 获取角色详情接口

### 接口调用说明

__请求地址 :__ [/role/details](#)

__请求方式 :__ GET

> 获取角色详情

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|id|String|角色ID|是|-|

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
  "message": "查询成功",
  "data": {
    "role": {
      "id": "8e899c55-a25a-4776-bfce-c0e36590868d",
      "role_name": "lalalala",
      "role_description": "角色的描述34",
      "deleted": false,
      "create_at": "1498114006749",
      "update_at": "1498114006749"
    },
    "permission": {
      "web": [
        {
          "id": "0377b4cc-37d8-4762-82d5-22992f507b72",
          "module_id": "62b0eeb3-b55c-411e-aec6-1cb731848294",
          "name": "新增会员",
          "slug": "create",
          "RolePermission": {
            "id": "40a881ee-5090-49d7-8fa5-c15f07f448cb",
            "role_id": "8e899c55-a25a-4776-bfce-c0e36590868d",
            "permission_id": "0377b4cc-37d8-4762-82d5-22992f507b72",
            "platform": "web"
          }
        },
        {
          "id": "05d278fa-cab1-4768-8cd1-0b204cb3eda8",
          "module_id": "013c80f8-a88e-43b3-8bfc-1cc6dcbacf7d",
          "name": "打印二维码",
          "slug": "print_qcode",
          "RolePermission": {
            "id": "627f7396-9874-4684-9266-f0ba686750bf",
            "role_id": "8e899c55-a25a-4776-bfce-c0e36590868d",
            "permission_id": "05d278fa-cab1-4768-8cd1-0b204cb3eda8",
            "platform": "web"
          }
        }
      ],
      "app": [
        {
          "id": "0377b4cc-37d8-4762-82d5-22992f507b72",
          "module_id": "62b0eeb3-b55c-411e-aec6-1cb731848294",
          "name": "新增会员",
          "slug": "create",
          "RolePermission": {
              "id": "43ea3eb9-b95f-40ec-b312-938d18179c25",
              "role_id": "8e899c55-a25a-4776-bfce-c0e36590868d",
              "permission_id": "0377b4cc-37d8-4762-82d5-22992f507b72",
              "platform": "app"
          }
        },
        {
          "id": "05d278fa-cab1-4768-8cd1-0b204cb3eda8",
          "module_id": "013c80f8-a88e-43b3-8bfc-1cc6dcbacf7d",
          "name": "打印二维码",
          "slug": "print_qcode",
          "RolePermission": {
              "id": "73144456-261e-4b4d-88a2-4ac5dcfcc681",
              "role_id": "8e899c55-a25a-4776-bfce-c0e36590868d",
              "permission_id": "05d278fa-cab1-4768-8cd1-0b204cb3eda8",
              "platform": "app"
          }
        }
      ]
    }
  }
}

```

