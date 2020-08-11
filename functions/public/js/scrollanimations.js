var lastScrollTop = 0;
var page = 1;
var p1s = false;

$(window).scroll(function(event){
   main();
});

$(window).resize(function(event){
    p1s = false;
    main();
 });
main();

function main() {
   var st = $(this).scrollTop();
   var ok = $(window).height()/2;
   if(st < $(window).height()) {
         $(".page1").css('opacity', `${(-1*st/ok)+1}`);
    } 
    
    if(st > ($(window).height()/3) && !p1s) {
        $(".gyv").addClass("t-1");
        tt2();
        setTimeout(tt1, 900);
        function tt1() {
            $(".gyv").css("color", "green");
        }
        function tt2() {
            $("#effect").animate({width:$(window).width()}, 1000);
        }
        p1s = true;
        console.log("ok");
    }

}



