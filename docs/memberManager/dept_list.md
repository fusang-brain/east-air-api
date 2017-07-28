## 获取组织架构列表接口

### 接口调用说明

__请求地址 :__ [/member/dept/list](#)

__请求方式 :__ GET

> 本接口用于获取组织架构列表

--------------------------------------

#### 参数列表

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|无|-|-|-|-|


#### 返回值

|字段名|类型|描述|是否必要|备注|
|-|-|-|-|-|
|code|Integer|1000 或其他|是|当code取值范围为 1000 - 2000 之间时（包含1000, 不包含2000）表示此次操作是成功的。当code取值范围为 2000 - 3000 (包含2000, 不包含3000)表示此次操作是失败的|
|message|String|具体消息|是|本字段是服务器对于本次操作结果的消息描述|
|data|Array<Object>|服务器附加的数据|否|本字段服务器并不是每次都会返回，大当每次请求需要返回相应的数据时本字段将会返回，并且是一个数组|


#### 返回示例

```json

// for pc
{
    "code": 1000,
    "message": "查看成功",
    "data": {
        "depts": [
            {
                "id": "2ac2259a-1a08-4f37-9fac-aca52466ad06",
                "tree_level": 1,
                "parent": "",
                "dept_name": "东方航空北京分公司工会",
                "children": [
                    {
                        "id": "a2ff4e93-6c80-4db9-a48f-89fadf563bde",
                        "tree_level": 2,
                        "parent": "2ac2259a-1a08-4f37-9fac-aca52466ad06",
                        "dept_name": "地服部分会",
                        "children": [
                            {
                                "id": "134523ed-44ee-4a4a-aa6a-57036abcae05",
                                "tree_level": 3,
                                "parent": "a2ff4e93-6c80-4db9-a48f-89fadf563bde",
                                "dept_name": "货运部分会33",
                                "children": [
                                    {
                                        "id": "5f2d5133-284d-4641-92af-9ecb67f10291",
                                        "tree_level": 4,
                                        "parent": "134523ed-44ee-4a4a-aa6a-57036abcae05",
                                        "dept_name": "货运部分会444",
                                        "children": []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "bea51268-1c3d-4f92-aed5-fab790f5a152",
                        "tree_level": 2,
                        "parent": "2ac2259a-1a08-4f37-9fac-aca52466ad06",
                        "dept_name": "飞行部分会",
                        "children": []
                    },
                    {
                        "id": "beddc44d-cecc-4213-bf94-5a629cb0dd0b",
                        "tree_level": 2,
                        "parent": "2ac2259a-1a08-4f37-9fac-aca52466ad06",
                        "dept_name": "运控部分会",
                        "children": []
                    },
                    {
                        "id": "e1738c1e-cdd1-445d-b37d-fdd5f483996c",
                        "tree_level": 2,
                        "parent": "2ac2259a-1a08-4f37-9fac-aca52466ad06",
                        "dept_name": "货运部分会",
                        "children": []
                    },
                    {
                        "id": "f0aa6241-4f7d-41cc-ae07-e5d4bd68bcff",
                        "tree_level": 2,
                        "parent": "2ac2259a-1a08-4f37-9fac-aca52466ad06",
                        "dept_name": "客舱部分会",
                        "children": []
                    }
                ]
            }
        ]
    }
}

// for app
{
    "code": 1000,
    "message": "查看成功",
    "data": {
        "depts": [
            {
                "id": "acff9672-74bf-4746-a7f9-529024b13580",     // 标识
                "tree_level": 2,                                  // 树型层级
                "parent": "6510c631-d0fb-4cf7-89ec-b18b619624a4", // 父级组织标识
                "dept_name": "飞行部分会",                          // 组织架构名
                "members": [],                                    // 当前组织架构下的所有会员
                "member_total": 10                                // 当前组织架构下会员总数
                "children": [                                     // 当前组织的子级组织
                    {
                        "id": "5f38bcc5-e257-458d-bc8e-979a1f2abf36",
                        "tree_level": 3,
                        "parent": "acff9672-74bf-4746-a7f9-529024b13580",
                        "dept_name": "飞行部分会1",
                        "children": [],
                        "member_total": 10
                        // 当前组织架构的会员
                        "members": [
                            {
                                "id": "0ffb29b7-d624-451a-b46e-092d8d0f41c9",
                                "name": "用户_4732", // 会员名
                                "avatar": ""
                            },
                            {
                                "id": "1d034ddd-057c-4919-bc97-f1aba806cbab",
                                "name": "用户_4732",
                                "avatar": ""
                            },
                            {
                                "id": "204630f5-6ee8-4a2f-af46-427a4791d808",
                                "name": "用户_4732",
                                "avatar": ""
                            },
                            {
                                "id": "298ac271-0a39-4f67-905c-594a66bc7c7f",
                                "name": "用户_4732",
                                "avatar": ""
                            },
                            {
                                "id": "4847a86c-78f9-4574-b7a0-6e20894bd618",
                                "name": "用户_4732",
                                "avatar": ""
                            },
                            {
                                "id": "52bba865-8932-482e-a386-4641523d7a31",
                                "name": "用户_4732",
                                "avatar": ""
                            },
                            {
                                "id": "762844eb-ac36-40b5-988e-885254ccb0f0",
                                "name": "用户_4732",
                                "avatar": ""
                            },
                            {
                                "id": "ad6c30b9-91bf-45bb-84e1-e675e5fdf764",
                                "name": "用户_4732",
                                "avatar": ""
                            },
                            {
                                "id": "c15959b9-d5eb-4c5d-9602-23c9ba465258",
                                "name": "用户_4732",
                                "avatar": ""
                            },
                            {
                                "id": "f0cb5505-70f3-4cde-b1d7-30f780e11ed8",
                                "name": "用户_4732",
                                "avatar": ""
                            }
                        ]                                  
                    },
                    {
                        "id": "4f7dc903-e957-47e0-a2aa-a4aaad8073ad",
                        "tree_level": 3,
                        "parent": "acff9672-74bf-4746-a7f9-529024b13580",
                        "dept_name": "飞行部分会2",
                        "children": [],
                        "members": [],
                        "member_total": 0
                    }
                ],
                
            },
            {
                "id": "0c62690b-a275-411f-8167-08027a7237f8",
                "tree_level": 2,
                "parent": "6510c631-d0fb-4cf7-89ec-b18b619624a4",
                "dept_name": "货运部分会",
                "children": [],
                "members": [],
                "member_total": 0
            },
            {
                "id": "371038d9-61fd-4141-af7e-dfdb405e1ac2",
                "tree_level": 2,
                "parent": "6510c631-d0fb-4cf7-89ec-b18b619624a4",
                "dept_name": "运控部分会",
                "children": [],
                "members": [],
                "member_total": 0
            },
            {
                "id": "3a01c58e-f28d-417b-b43c-7cf42bdd1a11",
                "tree_level": 2,
                "parent": "6510c631-d0fb-4cf7-89ec-b18b619624a4",
                "dept_name": "机关分会",
                "children": [],
                "members": [],
                "member_total": 0
            },
            {
                "id": "7eb1a4a5-ddf9-42cd-828d-45b8cbbc2851",
                "tree_level": 2,
                "parent": "6510c631-d0fb-4cf7-89ec-b18b619624a4",
                "dept_name": "地服部分会",
                "children": [],
                "members": [],
                "member_total": 0
            },
            {
                "id": "eae1ad94-c9b6-4dae-b21e-41a205a921e6",
                "tree_level": 2,
                "parent": "6510c631-d0fb-4cf7-89ec-b18b619624a4",
                "dept_name": "客舱部分会",
                "children": [],
                "members": [],
                "member_total": 0
            }
        ]
    }
}

```

