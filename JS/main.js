var topBtn = document.getElementById("topBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

$(document).on('click', '.nav-link', function (e) {
    $('a.active').removeClass('active');
    $(this).addClass('active');
})
$(window).scroll(function () {
    var scrollDistance = $(window).scrollTop();
    $('.section').each(function (i) {
        if ($(this).position().top <= scrollDistance) {
            $('a.active').removeClass('active');
            if (i < 4) {
                $('.ul-1').find('a').eq(i).addClass('active');
            } else if (i > 5) {

                $('.ul-1').find('a').eq(i - 2).addClass('active');
            }
            $('.ul-2').find('a').eq(i).addClass('active');
            // $('a').eq(i+8).addClass('active');
        }
    });
}).scroll();
var header = document.getElementById("myHeader");

$(document).on('click', '.form', function (e) {
    e.preventDefault();
    $('.ul-2').toggle();
});
$('.skill-per').each(function () {
    var $this = $(this);
    var per = $this.attr('per');
    $this.css("width", per + '%');
    $({animatedValue: 0}).animate({animatedValue: per}, {
        duration: 1000,
        step: function () {
            $this.attr('per', Math.floor(this.animatedValue) + '%');
        },
        complete: function () {
            $this.attr('per', Math.floor(this.animatedValue) + '%');
        }
    });
});