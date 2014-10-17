require.config({
    paths: {
        "rx": "http://cdnjs.cloudflare.com/ajax/libs/rxjs/2.3.13/rx.all"
    }
});
require(["rx", "../javascripts/responsive.js", "../javascripts/signup.js"], function() {

        !function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (!d.getElementById(id)) {
                js = d.createElement(s);
                js.id = id;
                js.src = "//platform.twitter.com/widgets.js";
                fjs.parentNode.insertBefore(js, fjs);
            }
        }(document, "script", "twitter-wjs");

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

        var mouseMoveStream = Rx.Observable.fromEvent(document, 'mousemove');
        var left = mouseMoveStream.map(function(e){ return e.pageX + 1; });
        var top = mouseMoveStream.map(function(e){ return e.pageY; })

        function setX(x) {
            this.css('left', x);
        }
        function setY(y) {
            this.css('top', y);
        }

        left.subscribe(setX.bind($('#mouse')));
        top.subscribe(setY.bind($('#mouse')));

        var xOffset = $('.mouseTail').outerWidth();
        var delay = 200;

        left.map(function(x) { return x + xOffset}).delay(delay).subscribe(setX.bind($('#tail')));
        top.delay(delay).subscribe(setY.bind($('#tail')));

        left.map(function(x) { return x + 2 * xOffset; }).delay(delay * 1.5).subscribe(setX.bind($('#moreTail')));
        top.delay(delay * 1.5).subscribe(setY.bind($('#moreTail')));

        left.map(function(x) { return x + 3 * xOffset; }).delay(delay * 2.5).subscribe(setX.bind($('#wagging')));
        //top.combineLatest(Rx.Observable.interval(100), setY.bind($('#wagging')));
        top.delay(200).combineLatest(Rx.Observable.interval(100).map(function() { return 10*Math.random() - 5; }), function(x,y) {return x+y;} ).subscribe(setY.bind($('#wagging')));





    }
)