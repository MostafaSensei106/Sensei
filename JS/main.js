// THIS JAVA SCRIPT CODE BY MOSTAFA MAHMOUD

var page_loader = document.getElementById("page-loader");
window.addEventListener("load", function () {
    page_loader.style.display = "none"
})

// Get the body element
var body = document.body;
// Get the button element by its id
var button = document.getElementById("dark-mode");
(function () {
    let onpageLoad = localStorage.getItem("theme") || "";

    if (window.matchMedia && onpageLoad === "") {
        // Check if the dark-mode Media-Query matches
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.classList.toggle("dark");
            body.classList.toggle("light");
        } else {
            button.classList.toggle("light");
            button.classList.toggle("dark");
        }
    } else {
        body.classList.add(onpageLoad);
    }
})();

// Add a click event listener to the button
button.addEventListener("click", function () {


    // Toggle the body class between light and dark
    body.classList.toggle("light");
    body.classList.toggle("dark");

    // Toggle the button class between light and dark
    button.classList.toggle("light");
    button.classList.toggle("dark");
    let theme = localStorage.getItem("theme");
    if (theme && theme === "dark") {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
});

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

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

$(document).on('click', '.nav-link', function (e) {
    $('a.active').removeClass('active');
    $(this).addClass('active');
})
var header = document.getElementById("myHeader");
$(document).on('click', '.form', function (e) {
    e.preventDefault();
    $('.ul-2').toggle();
});

let flag = true;
$(window).scroll(function () {
    var scrollDistance = $(window).scrollTop();
    $('.section').each(function (i) {
        if ($(this).position().top <= scrollDistance) {
            $('a.active').removeClass('active');
            if (i === 3) {
                skills();
            }
            if (i < 4) {
                $('.ul-1').find('a').eq(i).addClass('active');
            } else if (i > 5) {

                $('.ul-1').find('a').eq(i - 2).addClass('active');
            }
            $('.ul-2').find('a').eq(i).addClass('active');
        }
    });
}).scroll();

function skills() {
    if (flag === true) {
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
        flag = false;
    }
}

let slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide(n) {
    slides[index].classList.remove("active");
    index = (n + slides.length) % slides.length;
    slides[index].classList.add("active");
}

function nextSlide() {
    showSlide(index + 1);
}

function prevSlide() {
    showSlide(index - 1);
}

setInterval(nextSlide, 3000); // change slide every 3 seconds