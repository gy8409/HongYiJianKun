var utility = require('../public/javascripts/utility');
var user = require('../routes/users');

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

var district_of_city = {
    "beijing": [{value: "chaoyang", text: "朝阳"}, {value: "haidian", text: "海淀"}, {value: "dongcheng", text: "东城"}],
    "tianjin":[{value: "hexi", text: "河西"}, {value: "hedong", text: "河东"}, {value: "nankai", text: "南开"}],
    "shanghai":[{value: "huangpu", text: "黄埔"}, {value: "jingan", text: "静安"}, {value: "xuhui", text: "徐汇"}],
    "shenzhen":[{value: "luohu", text: "罗湖"}, {value: "nanshan", text: "南山"}]
};

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
	console.log(">>>getCareer" + req.url);
	console.dir(req.body);
	res.render('career', {bodyId: "career"});
    },
    getCareerForm: function(req, res) {
	console.log(">>>getCareerForm city:" + req.query.city);
	console.log(">>>res.locals: ");
	console.log(res.locals);
	console.log(req.body);
	console.log(req.params);
	console.log(req.query);
	console.log("<<<");

	var districts = district_of_city[req.query.city.toLowerCase()];
	console.log(districts + typeof(districts ));
		    console.dir(districts);
	var options;
	for (var d in districts) {
	    console.dir(districts[d]);
	    options += "<option value=\"" + districts[d].value + "\">" + districts[d].text + "</option>"
	}
	res.send(options);
    },
    getContact: function(req, res) {
	res.render('contact', {bodyId: "contact"});
    },
    signup: function(req, res) {
	// utility.createUser(req.body.email, req.body.email, req.body.password, function(err, user) {
	//     console.log(user);
	//     res.redirect('/');
	// });
    },
    check: function(req, res) {
	console.log(">>>check ");
	var data = req.query.username;
	console.log("username: %s", data);

	user.getByName(data, function(err, user){
	    if (err) {
		console.log("Username ok.");
		res.send("");
	    } else {
		console.log("Username has been taken.");

		res.send("Username has been taken.");
	    }
	    /* res.error("Username already taken"); */
	});
    },
    login: function(req, res) {
    	user.authenticate(req.body.username, req.body.password, function(err, user) {
    		if (err) {

    		}
    		console.log(">>>routes.login ");
    		console.dir(user);
    	});
    }
}
