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
        let skillElements = document.querySelectorAll(".skill-per");
        skillElements.forEach(function (skillElement) {
            let percentage = skillElement.getAttribute("per");
            skillElement.style.width = percentage + "%";
            let animatedValue = 0;
            let interval = setInterval(function () {
                if (animatedValue >= percentage) {
                    clearInterval(interval);
                } else {
                    animatedValue++;
                    skillElement.setAttribute("per", animatedValue + "%");
                }
            }, 10);
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

window.onscroll = function () {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let sections = document.querySelectorAll(".section");
    sections.forEach(function (section, index) {
        if (section.offsetTop <= scrollTop) {
            let activeLink = document.querySelector("a.active");
            if (activeLink) {
                activeLink.classList.remove("active");
            }
            if (index === 3) {
                skills();
            }
            if (index < 4) {
                document.querySelector(".ul-1").querySelectorAll("a")[index].classList.add("active");
            } else if (index > 5) {
                document.querySelector(".ul-1").querySelectorAll("a")[index - 2].classList.add("active");
            }
            document.querySelector(".ul-2").querySelectorAll("a")[index].classList.add("active");
        }
    });
};

let navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(function (navLink) {
    navLink.addEventListener("click", function () {
        let activeLink = document.querySelector("a.active");
        if (activeLink) {
            activeLink.classList.remove("active");
        }
        this.classList.add("active");
    });
});

document.addEventListener("click", function (e) {
    if (!e.target.closest('.form')) {
        document.querySelector(".ul-2").style.display = "none";
    }
});

let formElement = document.querySelector(".form");
formElement.addEventListener("click", function (e) {
    e.preventDefault();
    let ul2Element = document.querySelector(".ul-2");
    ul2Element.style.display = ul2Element.style.display === "none" ? "block" : "none";
});

// Initial Calls
setInitialTheme();
setInterval(nextSlide, 3000);

window.onscroll = function () {
    var scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    document.getElementById('line').style.width = scrollPercent + '%';
}
