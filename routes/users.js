var express = require('express');
var bcrypt = require('bcrypt');
var redis = require('redis');
var db = redis.createClient();
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

module.exports = User;

function User(obj) {
    for (var key in obj) {
	this[key] = obj[key];
    }
}

User.prototype.save = function (fn) {
    if (this.id) {
	this.update(fn);
    } else {
	var user = this;
	db.incr('user:ids', function(err, id) {
		console.log(">>>User.prototype.save id:%d", id);
	    if (err) {
		return fn(err);
	    }
	    user.id = id;
	    user.hashPassword(function(err) {
		if (err) return fn(err);
		user.update(fn);
	    });
	});
    }
}

User.prototype.update = function(fn) {
    var user = this;
    var id = user.id;
    console.log(">>>User.prototype.update id:%d", id);
    db.set('user:id:' + user.name, id, function(err) {
	if (err) return fn(err);
	db.hmset('user:' + id, user, function(err) {
	    fn(err);
	});
    });
}

User.prototype.hashPassword = function(fn) {
	var user = this;
	bcrypt.genSalt(12, function(err, salt) {
		if (err)  return fn(err);
		user.salt = salt;
		bcrypt.hash(user.pass, salt, function(err, hash) {
			if (err) return fn(err);
			user.pass = hash;
			fn();
		});
	});
};

User.getByName = function(name, fn) {
	console.log(">>>User.getByName fn: %s", fn);

	User.getId(name, function(err, id) {
		if (err) return fn(err);
		console.log(">>>User.getId callback fn: %s", fn);

		User.get(id, fn);
	});
};

User.getId = function(name, fn) {
	console.log(">>>User.getId name: %s, fn: %s", name, fn);
	db.get("user:id:" + name, fn);
};

User.get = function(id, fn) {
    db.hgetall("user:" + id, function(err, user) {
	// err is always null
	console.log(">>>User.get err: %s, user: %s", err, user);
	if (!user) { return fn(true); }
	fn(false, new User(user));
    });
};

User.authenticate = function(name, pass, fn) {
    User.getByName(name, function(err, user){
	if (err) return fn(err);
	if (!user.id) return fn();
	bcrypt.hash(pass, user.salt, function(err, hash) {
	    if (err) return fn(err);
	    if (hash == user.pass) return fn(null, user);
	    fn();
	});
    });
};
