// Elements
const pageLoader = document.getElementById("page-loader");
const bodyElement = document.body;
const darkModeButton = document.getElementById("dark-mode");
let slides = document.querySelectorAll(".slide");
let index = 0;
let flag = true;

// Functions
function toggleTheme(element, class1, class2) {
    element.classList.toggle(class1);
    element.classList.toggle(class2);
}

function setInitialTheme() {
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
}

function toggleDarkMode() {
    toggleTheme(bodyElement, "light", "dark");
    toggleTheme(darkModeButton, "light", "dark");
    const currentTheme = localStorage.getItem("theme");
    const newTheme = (currentTheme && currentTheme === "dark") ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
}

function skills() {
    if (flag) {
        $(".skill-per").each(function () {
            let skillElement = $(this);
            let percentage = skillElement.attr("per");

            skillElement.css("width", percentage + "%");

            $({animatedValue: 0}).animate({animatedValue: percentage}, {
                duration: 1000, complete: function () {
                    skillElement.attr("per", Math.floor(this.animatedValue) + "%");
                }
            });
        });

        flag = false;
    }
}

function showSlide(t) {
    slides[index].classList.remove("active");
    index = (t + slides.length) % slides.length;
    slides[index].classList.add("active");
}

function nextSlide() {
    showSlide(index + 1);
}

// Event Listeners
darkModeButton.addEventListener("click", toggleDarkMode);

window.addEventListener("load", function () {
    pageLoader.style.display = "none";
});

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

// Initial Calls
setInitialTheme();
setInterval(nextSlide, 3e3);

window.onscroll = function () {
    var scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    document.getElementById('line').style.width = scrollPercent + '%';
}
