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
                "id": "2ac2259a-1a08-4f37-9fac-aca52466ad06",    // 标识
                "tree_level": 1,                                 // 树型层级
                "parent": "",                                    // 父级组织标识
                "dept_name": "东方航空北京分公司工会",               // 组织架构名
                "members": [],                                   // 当前组织架构的会员
                "member_total": 2,                               // 当前组织架构下的会员总数
                "children": [                                    // 当前组织的子级组织
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
                                        "children": [],
                                        "members": [
                                            {
                                                "id": "02774c70-c7c8-441b-93cb-dacd67522667",
                                                "name": "å…¶ä»–",
                                                "avatar": ""
                                            }
                                        ],
                                        "member_total": 1
                                    }
                                ],
                                "members": [
                                    {
                                        "id": "b428b69b-cf67-49df-8f31-b88108267500",
                                        "name": "ç®¡ç\u0090†å‘˜",                         // 会员名
                                        "avatar": ""                                      // 会员头像
                                    }
                                ],
                                "member_total": 2
                            }
                        ],
                        
                    },
                    {
                        "id": "bea51268-1c3d-4f92-aed5-fab790f5a152",
                        "tree_level": 2,
                        "parent": "2ac2259a-1a08-4f37-9fac-aca52466ad06",
                        "dept_name": "飞行部分会",
                        "children": [],
                        "members": [],
                        "member_total": 0
                    },
                    {
                        "id": "beddc44d-cecc-4213-bf94-5a629cb0dd0b",
                        "tree_level": 2,
                        "parent": "2ac2259a-1a08-4f37-9fac-aca52466ad06",
                        "dept_name": "运控部分会",
                        "children": [],
                        "members": [],
                        "member_total": 0
                    },
                    {
                        "id": "e1738c1e-cdd1-445d-b37d-fdd5f483996c",
                        "tree_level": 2,
                        "parent": "2ac2259a-1a08-4f37-9fac-aca52466ad06",
                        "dept_name": "货运部分会",
                        "children": [],
                        "members": [],
                        "member_total": 0
                    },
                    {
                        "id": "f0aa6241-4f7d-41cc-ae07-e5d4bd68bcff",
                        "tree_level": 2,
                        "parent": "2ac2259a-1a08-4f37-9fac-aca52466ad06",
                        "dept_name": "客舱部分会",
                        "children": [],
                        "members": [],
                        "member_total": 0
                    }
                ],
                "members": [],
                "member_total": 2
            }
        ]
    }
}

```

