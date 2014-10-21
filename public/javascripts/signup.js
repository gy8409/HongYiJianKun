require(['rx'], function(){
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
            var input = $('input');
            var inputStream = Rx.Observable.fromEvent(input, 'focusout');
            var fieldStream = inputStream.map(function(e) {
                return e.target.name;
            });
            var valueStream = inputStream.map(function(e){
                return e.target.value;
            });
            var s = fieldStream.combineLatest(valueStream, function(name, val) {
                var vs = validator.fields[name];
                for (var i in vs) {
                    if (!vs[i].validator(val)) return vs[i].message;
                }
            }).combineLatest(inputStream, function(msg, selector) {
                if (msg) {
                    $(selector.target).after("<div>" + msg + "</div");
                }
                else {
                    $.ajax({
                        url: '/checkUsername',
                        data: { username: $(selector.target.value).val() },
                        success: function(){
                            // send username for checking existance
                            $(selector.target).siblings().removeClass().addClass(validator.feedbackIcon.validating);
                        }
                    }).done(function(data){
                        if (!data) {
                            msg = "用户名已经被注册了,再选一个吧！";
                        }
                    });
                }
                return msg;
            }).subscribe(function(msg) {
                console.log(">>>" + msg);
                if (msg) {
                    $(this).siblings().removeClass().addClass(validator.feedbackIcon.valid);
                } else {
                    $(this).siblings().removeClass().addClass(validator.feedbackIcon.invalid);
                }

            });


        });
    });

})
