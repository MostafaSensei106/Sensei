var page_loader=document.getElementById("page-loader");window.addEventListener("load",function(){page_loader.style.display="none"});var body=document.body,button=document.getElementById("dark-mode");!function(){var t=localStorage.getItem("theme")||"";window.matchMedia&&""===t?window.matchMedia("(prefers-color-scheme: dark)").matches?(body.classList.toggle("dark"),body.classList.toggle("light")):(button.classList.toggle("light"),button.classList.toggle("dark")):body.classList.add(t)}(),button.addEventListener("click",function(){body.classList.toggle("light"),body.classList.toggle("dark"),button.classList.toggle("light"),button.classList.toggle("dark");var t=localStorage.getItem("theme");t&&"dark"===t?localStorage.setItem("theme","light"):localStorage.setItem("theme","dark")});var topBtn=document.getElementById("topBtn");function scrollFunction(){20<document.body.scrollTop||20<document.documentElement.scrollTop?topBtn.style.display="block":topBtn.style.display="none"}function topFunction(){document.body.scrollTop=0,document.documentElement.scrollTop=0}window.onscroll=function(){scrollFunction()},$(document).on("click",".nav-link",function(t){$("a.active").removeClass("active"),$(this).addClass("active")});var header=document.getElementById("myHeader");$(document).on("click",".form",function(t){t.preventDefault(),$(".ul-2").toggle()});let flag=!0;function skills(){!0===flag&&($(".skill-per").each(function(){var t=$(this),e=t.attr("per");t.css("width",e+"%"),$({animatedValue:0}).animate({animatedValue:e},{duration:1e3,step:function(){t.attr("per",Math.floor(this.animatedValue)+"%")},complete:function(){t.attr("per",Math.floor(this.animatedValue)+"%")}})}),flag=!1)}$(window).scroll(function(){var e=$(window).scrollTop();$(".section").each(function(t){$(this).position().top<=e&&($("a.active").removeClass("active"),3===t&&skills(),t<4?$(".ul-1").find("a").eq(t).addClass("active"):5<t&&$(".ul-1").find("a").eq(t-2).addClass("active"),$(".ul-2").find("a").eq(t).addClass("active"))})}).scroll();let slides=document.querySelectorAll(".slide"),index=0;function showSlide(t){slides[index].classList.remove("active"),index=(t+slides.length)%slides.length,slides[index].classList.add("active")}function nextSlide(){showSlide(index+1)}function prevSlide(){showSlide(index-1)}setInterval(nextSlide,3e3);