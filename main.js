const cursor = document.querySelector(".cursor");

const TAIL_LENGTH = 20;

let mouseX = 0;
let mouseY = 0;
let cursorCircle;
let cursorHistory = Array(TAIL_LENGTH).fill({ x: 0, y: 0 });

function onmousemove(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

function createCircle() {
  for (let i = 0; i < TAIL_LENGTH; i++) {
    let div = document.createElement("div");
    div.classList.add("cursor-circle");
    cursor.append(div);
  }
  cursorCircle = Array.from(document.querySelectorAll(".cursor-circle"));
}

function updateCircle() {
  cursorHistory.shift();
  cursorHistory.push({ x: mouseX, y: mouseY });
  for (let i = 0; i < TAIL_LENGTH; i++) {
    let current = cursorHistory[i];
    let next = cursorHistory[i - 1] || cursorHistory[TAIL_LENGTH - 1];

    let x = next.x - current.x;
    let y = next.y - current.y;

    current.x += x * 0.2;
    current.y += y * 0.2;

    cursorCircle[i].style.transform = `translate(${current.x}px, ${
      current.y
    }px) scale(${i / TAIL_LENGTH})`;
  }
  requestAnimationFrame(updateCircle);
}
document.addEventListener("mousemove", onmousemove);

createCircle();
updateCircle();

// slider
const sliderDiv = document.querySelector(".sliderDiv");
const slider = document.querySelector(".slider");

let isDragging = false;
let startX;
let x;
let prePercentage = 0;
sliderDiv.addEventListener("mousedown", function (e) {
  isDragging = true;
  startX = e.pageX - slider.offsetLeft;
  sliderDiv.style.cursor = "grabbing";
});

sliderDiv.addEventListener("mouseup", function (e) {
  isDragging = false;
  sliderDiv.style.cursor = "grab";
  updateSlider();
});
sliderDiv.addEventListener("mouseleave", function (e) {
  isDragging = false;
  sliderDiv.style.cursor = "grab";
  updateSlider();
});

sliderDiv.addEventListener("mousemove", function (e) {
  if (!isDragging) return;
  e.preventDefault();
  x = e.pageX;
  // slider.style.left = `${x - startX}px`;
  slider.animate(
    {
      left: `${x - startX}px`,
    },
    {
      duration: 1000,
      fill: "forwards",
    }
  );
});

function updateSlider() {
  const outer = sliderDiv.getBoundingClientRect();
  const inner = slider.getBoundingClientRect();

  if (slider.offsetLeft > 0) {
    slider.animate(
      {
        left: `${0}px`,
      },
      {
        duration: 500,
        fill: "forwards",
      }
    );
  } else if (inner.right < outer.right) {
    slider.animate(
      {
        left: `${outer.width - inner.width}px`,
      },
      {
        duration: 500,
        fill: "forwards",
      }
    );
  }
}

// const hover = document.querySelectorAll(".hover");
// hover.forEach((el) => {
//   el.style.height = `${el.offsetHeight / 2}px`;
// });

// const logo = document.querySelectorAll(".logo");
// logo.forEach((el) => {
//   el.style.width = `${el.offsetWidth / 2}px`;
// });

const animeText = document.querySelector(".animeText");

// Function to switch between animations
function switchAnimation() {
  if (animeText.style.animationName === "moveDown") {
    animeText.style.animationName = "moveUp";
  } else {
    animeText.style.animationName = "moveDown";
  }
}

// Start the animation once
switchAnimation(); // Initial animation (moveDown)

// Set up the interval to repeat the animation every 5 seconds
const intervalId = setInterval(switchAnimation, 4000);

// Optionally, clear the interval when the element is no longer visible (e.g., on page unload)
window.addEventListener("unload", () => clearInterval(intervalId));

// hide menu
const menu = document.querySelector(".menu");
const footer = document.querySelector("footer");

console.log(footer);