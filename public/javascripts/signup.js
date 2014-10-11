
$(document).ready(function(){
    $("input[name='username']").focusout(function(){
	var that = $(this);
	$.ajax({
	    url: '/checkUsername',
	    data: { username: $(this).val() },
	    success: function(){
		$("#userCheck").css("display", "block");
	    }

	}).done(function(data){
	    if (data) {
		$('#userCheck').attr("src", "").removeClass().addClass('correct');
	    } else {
		$('#userCheck').attr("src", "").removeClass().addClass('wrong');
	    }
	});
    }).focusin(function(){
	$("#userCheck").remove();
    });
});
