**工会部门表**

|字段|类型|说明|备注|
|-|-|-|-|
|id|UUID|标识|unique, primary key|
|tree_level|Integer|当前工会的数型级别|-|
|parent|UUID|当前工会的父级标识|-|
|dept_name|String|工会名|-|
|deleted|Boolean|是否已经删除|-|
|create_at|String|记录创建时间|-|
|update_at|String|记录最近的更新时间|-|