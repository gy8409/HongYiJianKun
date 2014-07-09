 !function(d,s,id){
     var js,fjs=d.getElementsByTagName(s)[0];
     if(!d.getElementById(id)){
	 js=d.createElement(s);
	 js.id=id;
	 js.src="//platform.twitter.com/widgets.js";
	 fjs.parentNode.insertBefore(js,fjs);
     }
 }(document,"script","twitter-wjs");

 $(function () {
     $(".rslides").responsiveSlides({
         auto: true,
	 pause: true,
         speed: 800,
	 timeout: 2000,
	 nav: true,
	 namespace: "rslides",
     });
 });
