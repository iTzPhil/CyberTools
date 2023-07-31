// Highlight current nav item
var buttons = document.querySelectorAll(".nav-menu button");

buttons.forEach(function (button) {
  if (
    !button.classList.contains("settings") &&
    !button.classList.contains("current-home")
  ) {
    button.addEventListener("click", function () {
      buttons.forEach(function (button) {
        button.classList.remove("current") &&
          button.classList.remove("current-home");
      });
      button.classList.add("current");
    });
  }
  if (button.classList.contains("current-home")) {
    button.addEventListener("click", function () {
      buttons.forEach(function (button) {
        button.classList.remove("current") &&
          button.classList.remove("current-home");
      });
      button.classList.add("current-home");
    });
  }
});

// Content switcher
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let content = button.innerHTML.toLowerCase().replace(/ /g, "_");
    let div = document.getElementById(content);
    let divs = document.getElementById("content-area").children;
    for (let i = 0; i < divs.length; i++) {
      divs[i].classList.remove("active");
    }
    try {
      div.classList.add("active");
    } catch (error) {
      if (error instanceof TypeError) {
        console.log("No content found for " + content);
      }
    }
  });
});

// Display current password length
const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("length-value");

lengthInput.addEventListener("input", () => {
  lengthValue.textContent = lengthInput.value;
});
