var lastScrollTop = 0;
var page = 1;
var p1s = false;

$(window).scroll(function(event){
   main();
});

main();

function main() {
    var st = $(this).scrollTop();
   var ok = $(window).height()/2;
   if(st < $(window).height()) {
         $(".page1").css('opacity', `${(-1*st/ok)+1}`);
         if(2.5*st != 0 && $("#effect").width() <= $(window).width()+5) {
             if(2.5*st > $(window).width()) {
                $("#effect").animate({width:$(window).width()}, 10);
             } else {
                // $("#effect").animate({width:$(window).width}, 1000, $.bez([0,0,0.6,1]));
                $("#effect").animate({width:2.5*st}, 10);
             }
         }
    } 
    
    if(st > ($(window).height()/3) && !p1s) {
        $(".gyv").addClass("t-1");
        setTimeout(tt1, 900);
        function tt1() {
            $(".gyv").css("color", "green");
        }
        p1s = true;
        console.log("ok");
    }


   lastScrollTop = st;
}



