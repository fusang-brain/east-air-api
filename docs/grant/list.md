## 获取经审列表接口

### 接口调用说明

__请求地址 :__ [/grant/list](#)

__请求方式 :__ GET

> 接口描述...

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|search|string|根据经审类型进行搜索|no|-|
|state|string|根据状态筛选|no|draft: 草稿 pending: 待处理 success: 成功 fail: 失败|


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
        "total": 8,
        "list": [
            {
                "id": "079f291a-a250-449a-945e-4017f653da65",
                "type": 1,
                "type_string": "慰问困难、生病员工",
                "dept_id": "2134a673-233d-4f3f-bc18-c68123ce1ea5",
                "user_id": "aee52788-3c41-441b-8cee-e6022f54d83f",
                "cost": "12.50",
                "purpose": "目的",
                "people_count": 2,
                "others": "asdfasdf",
                "state": 0,
                "apply_time": null,
                "is_act": false,
                "items": [],
                "attach": [
                    {
                        "id": "73c47efc-fbbe-4051-8ce0-0bc3ae21166e",
                        "grant_application_id": "079f291a-a250-449a-945e-4017f653da65",
                        "no": "2017081400364401",
                        "file_path": "/safas/sdfasf/asdfasf"
                    }
                ],
                "dept": {
                    "id": "2134a673-233d-4f3f-bc18-c68123ce1ea5",
                    "tree_level": 3,
                    "parent": "21afde3e-5e11-4342-849a-cd561c22a919",
                    "dept_name": "部门2"
                },
                "publisher": {
                    "id": "aee52788-3c41-441b-8cee-e6022f54d83f",
                    "name": "用户_8592",
                    "avatar": ""
                }
            }
            ...
         ]
    }
}

```

* [返回索引](../readme.md)
