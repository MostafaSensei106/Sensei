// JavaScript code for creating and moving the stars
// Get the body element
var body = document.querySelector("body");

// Set the number of stars to create
var numStars = 100;

// Create a function to generate a random number between min and max
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Create a function to create a star element and append it to the body
function createStar() {
    // Create a star element
    var star = document.createElement("div");

    // Add the star class to the element
    star.classList.add("star");

    // Set the initial position of the star randomly
    star.style.left = randomNumber(0, window.innerWidth) + "px";
    star.style.top = randomNumber(0, window.innerHeight) + "px";

    // Append the star element to the body
    body.appendChild(star);
}

// Create a function to move the star element across the screen
function moveStar(star) {
    // Get the current position of the star
    var left = parseInt(star.style.left);
    var top = parseInt(star.style.top);

    // Set the speed of the star movement
    var speed = randomNumber(1, 3);

    // Move the star to the left by the speed value
    left -= speed;

    // If the star reaches the left edge of the screen, reset its position to the right edge
    if (left < -10) {
        left = window.innerWidth + 10;
        top = randomNumber(0, window.innerHeight);
        speed = randomNumber(1, 3);
    }

    // Update the position of the star element
    star.style.left = left + "px";
    star.style.top = top + "px";
}

// Create a loop to create and move the stars
for (var i = 0; i < numStars; i++) {

    // Create a star element
    createStar();

    // Get the star element from the body's last child
    var star = body.lastChild;

    // Move the star element every frame using requestAnimationFrame
    (function(star) {
        function frame() {
            moveStar(star);
            requestAnimationFrame(frame);
        }
        frame();
    })(star);
}
