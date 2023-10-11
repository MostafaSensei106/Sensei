var page_loader = document.getElementById("page-loader");
window.addEventListener("load", function () {
    page_loader.style.display = "none"
});

// Get references to the body and button elements
var bodyElement = document.body;
var darkModeButton = document.getElementById("dark-mode");

// Function to set the initial theme based on user preference or system settings
(function setInitialTheme() {
    var currentTheme = localStorage.getItem("theme") || "";
    if (window.matchMedia && currentTheme === "") {
        var prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (prefersDarkScheme) {
            toggleTheme(bodyElement, "dark", "light");
        } else {
            toggleTheme(darkModeButton, "light", "dark");
        }
    } else {
        bodyElement.classList.add(currentTheme);
    }
})();

// Event listener for the dark mode button
darkModeButton.addEventListener("click", function toggleDarkMode() {
    toggleTheme(bodyElement, "light", "dark");
    toggleTheme(darkModeButton, "light", "dark");

    var currentTheme = localStorage.getItem("theme");
    var newTheme = (currentTheme && currentTheme === "dark") ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
});

// Helper function to toggle classes
function toggleTheme(element, class1, class2) {
    element.classList.toggle(class1);
    element.classList.toggle(class2);
}

var topBtn = document.getElementById("topBtn");

function scrollFunction() {
    20 < document.body.scrollTop || 20 < document.documentElement.scrollTop ? topBtn.style.display = "block" : topBtn.style.display = "none"
}

function topFunction() {
    document.body.scrollTop = 0, document.documentElement.scrollTop = 0
}

window.onscroll = function () {
    scrollFunction()
}, $(document).on("click", ".nav-link", function (t) {
    $("a.active").removeClass("active"), $(this).addClass("active")
});
var header = document.getElementById("myHeader");
$(document).on("click", function (e) {
    if (!$(e.target).closest('.form').length) {
        // Clicked outside the form, close .ul-2
        $(".ul-2").hide();
    }
});

$(document).on("click", ".form", function (t) {
    t.preventDefault();
    $(".ul-2").toggle();
});


let flag = true;

function skills() {
    if (flag) {
        $(".skill-per").each(function () {
            let skillElement = $(this);
            let percentage = skillElement.attr("per");

            skillElement.css("width", percentage + "%");

            $({animatedValue: 0}).animate({animatedValue: percentage}, {
                duration: 1000, step: function () {
                    skillElement.attr("per", Math.floor(this.animatedValue) + "%");
                }, complete: function () {
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

let slides = document.querySelectorAll(".slide"), index = 0;

function showSlide(t) {
    slides[index].classList.remove("active"), index = (t + slides.length) % slides.length, slides[index].classList.add("active")
}

function nextSlide() {
    showSlide(index + 1)
}

function prevSlide() {
    showSlide(index - 1)
}

setInterval(nextSlide, 3e3);