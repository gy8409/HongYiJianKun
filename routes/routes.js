var utility = require('../public/javascripts/utility');

var introduction_sidemenu = [
    {source: "#summary", innerHTML: "公司简介"},
    {source: "#team", innerHTML: "团队"},
    {source: "#milestone", innerHTML: "里程碑"},
];

var service_sidemenu = [
    {source: "", icon:"%", innerHTML: "应用开发和维护"},
    {source: "", icon:"!", innerHTML: "ERP实施与咨询"},
    {source: "", icon:"\'", innerHTML: "软件全球化与本地化"},
    {source: "", icon:"+", innerHTML: "专业测试与性能"},
    {source: "", icon:"$", innerHTML: "前端解决方案"}
];

module.exports = {
    getIndex: function(req, res) {
	res.render('index', {sidebar: service_sidemenu, bodyId: "index"});
    },
    getIntroduction: function(req, res) {
	res.render('introduction', {sidebar: introduction_sidemenu, bodyId: "introduction"});
    },
    getServices: function(req, res) {
	res.render('services', {sidebar: service_sidemenu, bodyId: "services"});
    },
    getCareer: function(req, res) {
	res.render('career', {bodyId: "career"});
    },
    getContact: function(req, res) {
	res.render('contact', {bodyId: "contact"});
    },
    signup: function(req, res) {
	utility.createUser(req.body.email, req.body.email, req.body.password, function(err, user) {
	    console.log(user);
	    res.redirect('/');
	});
    }
}
