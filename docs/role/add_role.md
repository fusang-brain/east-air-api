## 新增角色接口

### 接口调用说明

__请求地址 :__ [/role/create](#)

__请求方式 :__ POST

> 新增一个角色

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|role_name|String|角色名|是|-|
|role_description|String|角色描述|是|-|
|app_permissions|Array<String>|APP权限ID列表|否|-|
|web_permissions|Array<String>|WEB权限ID列表|否|-|


#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|

#### 请求示例

```json

{
	"role_name": "lalalala",
	"role_description": "角色的描述34",
	"web_permissions":[
		"5631f99f-5759-49f5-adc7-74a4c38f84ea",
		"3f73b2ae-c31a-43e2-a7bf-5cdfa808e5f8"
	],
	"app_permissions":[
    "5631f99f-5759-49f5-adc7-74a4c38f84ea",
    "3f73b2ae-c31a-43e2-a7bf-5cdfa808e5f8"
  ]
}
```

#### 返回示例

```json

{
  "code": 1004,
  "message": "创建成功",
  "data": {
    "created_role": {
        "id": "f3fcbd16-4f37-45ee-b537-06a3bb68233f",
        "deleted": false,
        "create_at": 1498108655363,
        "update_at": 1498108655363,
        "role_name": "lalalala",
        "role_description": "角色的描述34"
    }
  }
}

```

