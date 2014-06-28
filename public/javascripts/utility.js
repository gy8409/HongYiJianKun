var crypto = require('crypto');
var db = require('./db');


function encryptPassword(plainText) {
    return crypto.createHash('md5').update(plainText).digest('hex');
}

module.exports = {
    createUser: function(username, email, password, callback) {
	var user = { username: username,
		     email: email,
		     password: encryptPassword(password) };

	db.insertUser(user, callback);
    }
};
