
var tl = gsap.timeline();
async function pageTransition1() {


    await tl.to('ul.transition li', {
        duration: 0.4,
        scaleY: 1,
        transformOrigin: "bottom left",
        stagger: 0.08
    });
    return true;
}

function pageTransition2() {
    tl.to('ul.transition li', {
        duration: 0.4,
        scaleY: 0,
        transformOrigin: "bottom left",
        stagger: 0.08,
        delay: .2
    })
}


function contentAnimation() {
    console.log('epic')
}

function delay(n) {
    n = n || 2000;
    return new Promise(done => {
        setTimeout(() => {
            done();
        }, n);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    barba.init({
        timeout: 5000,
        sync: false,
        views: [{
            namespace: 'index',
            afterEnter(data) {
                index();
            }
        }],
        transitions: [{
            async leave(data) {
                // var done = this.async();
                // setTimeout(pageTransition1, 1);
                // setTimeout(done, 250);
                await pageTransition1();
                return true;
            },
            async enter(data) {
                setTimeout(pageTransition2, 1);
            },
            async once(data) {
                // contentAnimation();
            }
        }]
    })

})



//PAGE SPECIFIC FUNCTIONS

function index() {
    
    console.log("ok");
    $.getScript("http://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js", function( data, textStatus, jqxhr ) {
        particlesJS("particles-js", {"particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#1f2833"},"shape":{"type":"circle","stroke":{"width":0,"color":"#1f2833"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#c5c6c7","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":false,"mode":"bubble"},"onclick":{"enable":true,"mode":"repulse"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});
        
    });
    $.getScript("../js/scrollanimations.js", function( data, textStatus, jqxhr ) {
        console.log( "Load was performed." );
    });
    $.getScript("../js/materiallib.js", function( data, textStatus, jqxhr ) {
        console.log( "Load was performed." );
    });
    

    mdc.ripple.MDCRipple.attachTo(document.querySelector('.foo-button'));
}



function team() {

}