var tobi = new User({
	name: "tobi",
	pass: "I am ferri.",
	age: 22
});

tobi.save(function(err) {
	if (err) throw err;
	console.log("user id %d", tobi.id);
});