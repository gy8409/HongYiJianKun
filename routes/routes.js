var sidemenu = [
	    {source: "", innerHTML: "应用开发和维护"},
	    {source: "", innerHTML: "ERP实施与咨询"},
	    {source: "", innerHTML: "软件全球化与本地化"},
	    {source: "", innerHTML: "专业测试与性能"},
	    {source: "", innerHTML: "前端解决方案"}
	];

module.exports = {
    getIndex: function(req, res) {
	res.render('index', {sidebar: sidemenu, bodyId: "index"});
    },
    getIntroduction: function(req, res) {
	res.render('introduction', {bodyId: "introduction"});
    },
    getServices: function(req, res) {
	res.render('services', {sidebar: sidemenu, bodyId: "services"});
    },
    getCareer: function(req, res) {
	res.render('career', {bodyId: "career"});
    },
    getContact: function(req, res) {
	res.render('contact', {bodyId: "contact"});
    }
}
