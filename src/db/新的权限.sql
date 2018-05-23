INSERT INTO ArticleGroups (id, name, id_type, sort) values ('684dd853-0c5e-4fe2-b8ce-0337a64042a6', '视频', 'video', 2), ('a6331844-02da-40cb-8338-f69ef9a317ae', '新闻', 'common', 1);
INSERT INTO Modules (id, name, slug) values ('180eb427-f7b3-403f-8987-6b01fe53c817', '我们家的事', 'article');

INSERT INTO Permissions (id, module_id, module_slug, name, slug) 
values 
('713dad52-4310-4b17-a8fd-33ae19d60910', 'e32c5bef-a723-440d-ab01-ab8f4c368318', 'satisfaction_degree_investigation', '导出', 'export'),
('41f49411-b790-4bb8-9981-e67c4e938ba4', '180eb427-f7b3-403f-8987-6b01fe53c817', 'article', '编辑动态', 'edit'),
('18c5550c-90d0-4d90-9519-c56da53af5f2', '180eb427-f7b3-403f-8987-6b01fe53c817', 'article', '添加动态', 'create'),
('e20afd6a-533e-4a70-a591-1e63ea6ef989', '180eb427-f7b3-403f-8987-6b01fe53c817', 'article', '删除动态', 'deleted'),
('77972225-18e0-418e-b3ec-f48cd5bc0643', '180eb427-f7b3-403f-8987-6b01fe53c817', 'article', '动态分类', 'category'),
('4722a502-28c4-4186-9056-325d55972415', '180eb427-f7b3-403f-8987-6b01fe53c817', 'article', '置顶', 'top'),
('fb8fdffa-0151-435e-ae0c-4871764ae840', '180eb427-f7b3-403f-8987-6b01fe53c817', 'article', '查看动态', 'view');