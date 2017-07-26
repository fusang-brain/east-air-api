## 获取会员详情

### 接口调用说明

__请求地址 :__ [/member/details](#)

__请求方式 :__ GET

> 获取成员列表

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|user|String|用户ID|是|-|

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
        "user": {
            "id": "0ffb29b7-d624-451a-b46e-092d8d0f41c9",
            "name": "用户_4732",
            "no": 0,
            "birthday": "1501055966424",
            "card_num": "--",
            "mobile": "15500000003",
            "type": 0,
            "ehr": "",
            "state": 0,
            "other_status": 0,
            "gender": 0,
            "qq": "",
            "wechat": "",
            "degree": 0,
            "duties": "",
            "jobs": "",
            "exist_job_level": "",
            "now_job_level": "",
            "start_work_time": null,
            "join_time": null,
            "mark": "",
            "avatar": "",
            "integration": 0,
            "quit_time": null,
            "retire_time": null,
            "create_at": "1501055966326",
            "update_at": "1501055966326",
            "user_role": {
                "id": "49a01f2b-8b47-4545-a385-50faeb68c42e",
                "role_name": "工会主席",
                "role_description": "工会主席描述",
                "deleted": false,
                "create_at": "1501055966058",
                "update_at": "1501055966058"
            },
            "department": {
                "id": "d9bfe9c6-8ee3-4517-8f16-7e644a257b1a",
                "tree_level": 4,
                "parent": "5f38bcc5-e257-458d-bc8e-979a1f2abf36",
                "dept_name": "三级分类1"
            }
        }
    }
}

```

