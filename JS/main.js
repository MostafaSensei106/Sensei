// Get references to the elements
const pageLoader = document.getElementById("page-loader");
const bodyElement = document.body;
const darkModeButton = document.getElementById("dark-mode");
let slides = document.querySelectorAll(".slide"), index = 0;

function toggleTheme(element, class1, class2) {
    element.classList.toggle(class1);
    element.classList.toggle(class2);
}

(function setInitialTheme() {
    const currentTheme = localStorage.getItem("theme") || "";
    if (window.matchMedia && currentTheme === "") {
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (prefersDarkScheme) {
            toggleTheme(bodyElement, "dark", "light");
        } else {
            toggleTheme(darkModeButton, "light", "dark");
        }
    } else {
        bodyElement.classList.add(currentTheme);
    }
})();

darkModeButton.addEventListener("click", function toggleDarkMode() {
    toggleTheme(bodyElement, "light", "dark");
    toggleTheme(darkModeButton, "light", "dark");

    const currentTheme = localStorage.getItem("theme");
    const newTheme = (currentTheme && currentTheme === "dark") ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
});




window.addEventListener("load", function () {
    pageLoader.style.display = "none";
});



let flag = true;

function skills() {
    if (flag) {
        $(".skill-per").each(function () {
            let skillElement = $(this);
            let percentage = skillElement.attr("per");

            skillElement.css("width", percentage + "%");

            $({animatedValue: 0}).animate({animatedValue: percentage}, {
                duration: 1000,
                complete: function () {
                    skillElement.attr("per", Math.floor(this.animatedValue) + "%");
                }
            });
        });

        flag = false;
    }
}

$(window).scroll(function () {
    var scrollTop = $(window).scrollTop();
    $(".section").each(function (index) {
        if ($(this).position().top <= scrollTop) {
            $("a.active").removeClass("active");

            if (index === 3) {
                skills();
            }
            if (index < 4) {
                $(".ul-1").find("a").eq(index).addClass("active");
            } else if (index > 5) {
                $(".ul-1").find("a").eq(index - 2).addClass("active");
            }
            $(".ul-2").find("a").eq(index).addClass("active");
        }
    });
}).scroll();

function showSlide(t) {
    slides[index].classList.remove("active"), index = (t + slides.length) % slides.length, slides[index].classList.add("active")
}

function nextSlide() {
    showSlide(index + 1)
}

setInterval(nextSlide, 3e3);

window.onscroll = function () {
    var scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    document.getElementById('line').style.width = scrollPercent + '%';
}

$(document).on("click", ".nav-link", function () {
    $("a.active").removeClass("active");
    $(this).addClass("active");
});

$(document).on("click", function (e) {
    if (!$(e.target).closest('.form').length) {
        $(".ul-2").hide();
    }
});

$(document).on("click", ".form", function (e) {
    e.preventDefault();
    $(".ul-2").toggle();
});

window.addEventListener('scroll', function () {
    var element = document.getElementById('about_text');
    var position = element.getBoundingClientRect();

    // checking whether fully visible
    if (position.top >= 0 && position.bottom <= window.innerHeight) {
        typeWriter(element);
        window.removeEventListener('scroll', arguments.callee);
    }
});

function typeWriter(element) {
    var text = element.innerHTML;
    element.innerHTML = '';
    var i = 0;
    var speed = 30; // Speed of typing in milliseconds

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}
