
$(document).ready(function(){
    var validator = {
	feedbackIcon: {
	    valid: "glyphicon glyphicon-ok form-control-feedback",
	    invalid: "glyphicon glyphicon-remove form-control-feedback",
	    validating: "glyphicon glyphicon-refresh form-control-feedback"
	},
	fields: {
	    username: [
		{ validator: function isNotEmpty(val) { return val.length; },
		  message: "用户名可不能少啊！" },
		{ validator: function isLegal(val) { return /^[\w .]{3,20}$/g.test(val) },
		  message: "用户名只能包含数字,字母和下划线。" }],
	    email:  [
		{ validator: function isNotEmpty() {},
		  message: "邮箱必须填哦！" },
		{ validator: function isLegal(){		},
		  message: "邮箱不合法，是不是输错了？"}
	    ],
	    password: [
		{ validator: function isNotEmpty() {},
		  message: "密码不能为空！" },
		{ validator: function isLegal(){		},
		  message: "密码不安全，至少包含数字和字母，并且在8位以上。" },
	    ],
	    repassword: [
		{ validator: function isLegal() {},
		  message: "两次输入不一样，重新输入吧。" }
	    ]
	}
    };

    $("#signupModal").on('shown.bs.modal', function() {
	$("input").focusout(function(){
	    var value = $(this).val();
	    var field = $(this).attr('name');
	    var isValid = false;
	    var validators = validator.fields[field];
	    var message = " ";
	    for ( var i in validators ) {
		var v = validators[i];
		if (v.validator(value) ) {
		    isValid = true;
		} else {
		    isValid = false;
		    message = v.message;
		    break;
		}
	    }

	    var that = $(this);

	    /* for username existance */
	    if (isValid) {
		$.ajax({
		    url: '/checkUsername',
		    data: { username: $(this).val() },
		    success: function(){
			// send username for checking existance
			that.siblings().removeClass().addClass(validator.feedbackIcon.validating);
		    }
		}).done(function(data){
		    if (data) {
			that.siblings().removeClass().addClass(validator.feedbackIcon.valid);
		    } else {
			that.siblings().removeClass().addClass(validator.feedbackIcon.invalid);
			message = "用户名已经被注册了,再选一个吧！";
		    }
		});
	    }

	    if (isValid) {
		$(this).siblings().removeClass().addClass(validator.feedbackIcon.valid);
	    } else {
		$(this).siblings().removeClass().addClass(validator.feedbackIcon.invalid);
	    }

	    console.log(message);
	});
    });
});

/* ({
$("input[name='username']").focusout(function(){
var that = $(this);
$.ajax({
url: '/checkUsername',
data: { username: $(this).val() },
success: function(){
// $("#userCheck").removeClass().attr('src', '../images/loading.gif').show();
}

}).done(function(data){
if (data) {
$('.form-control-feedback').removeClass('glyphicon-ok').addClass('glyphicon-remove').parent().removeClass('has-success').addClass('has-error');
} else {
$('.form-control-feedback').removeClass('glyphicon-remove').addClass('glyphicon-ok').parent().removeClass('has-error').addClass('has-success');
}
});
}).focusin(function(){
$("#userCheck").hide();
});
}); */
