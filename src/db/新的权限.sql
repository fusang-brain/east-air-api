INSERT INTO ArticleGroups (id, name, id_type, sort) values ('39e1f6e7-f1a0-4810-968d-dbf859c4963d', '视频', 'video', 2), ('6f7c2781-524a-458e-86d6-a16e55fc01d3', '新闻', 'common', 1);
INSERT INTO Modules (id, name, slug) values ('eea6576c-87ff-67hi-93jj-djdiendfsdfa', '北分动态', 'article');

INSERT INTO Permissions (id, module_id, module_slug, name, slug) 
values 
('87uijwiji-98ad-unv3-87jn-jnnjjl9hu23', 'eea6576c-87ff-67hi-93jj-djdiendfsdfa', 'article', '编辑动态', 'edit'),
('87uijwiji-98ad-unv3-87jn-jnnjjl9huu8', 'eea6576c-87ff-67hi-93jj-djdiendfsdfa', 'article', '添加动态', 'create'),
('87uijwiji-98ad-unv3-87jn-jnnjjl9huu9', 'eea6576c-87ff-67hi-93jj-djdiendfsdfa', 'article', '删除动态', 'deleted'),
('87uijwiji-98ad-unv3-87jn-jnnjjl9huy7', 'eea6576c-87ff-67hi-93jj-djdiendfsdfa', 'article', '查看动态', 'view');