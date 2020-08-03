var lastScrollTop = 0;
var page = 1;
var p1s = false;

$(window).scroll(function(event){
   var st = $(this).scrollTop();
   var ok = $(window).height()/2;
   if(st < $(window).height()) {
         $(".outer").css('opacity', `${(-1*st/ok)+1}`);
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
});