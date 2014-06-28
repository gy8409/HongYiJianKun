var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.mongoose = mongoose;
module.exports.Schema = Schema;
module.exports.insertUser = insertUser;

// connect to cloud database
var username = 'gy';
var password = 'gyTest';
var address = '@ds061158.mongolab.com:61158/hongyijiankun';

connect();

// Connect to mongo
function connect() {
    var url = 'mongodb://' + username + ':' + password + address;
    mongoose.connect(url);
    console.log("<<<<<<connected");
}

function disconnect() {
    console.log(">>>>>>disconnect");
    mongoose.disconnect();
}

var userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String
});

var User = mongoose.model('User', userSchema);

function insertUser(item, callback) {
    var newUser = new User();
    newUser.username = item.username;
    newUser.email = item.email;
    newUser.password = item.password;
    newUser.save(function(err) {
	if (err) {
	    callback(err);
	    console.error(err);
	} else {
	    console.dir(newUser);
	    callback(null, newUser);
	}
    });
}
