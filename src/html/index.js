const { ipcRenderer, dialog, remote } = require("electron");

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


// Encode
const encodeButton = document.getElementById("encode-button");
const encodeInput = document.getElementById("encode-input");
const encodeOutput = document.getElementById("encode-output");

encodeButton.addEventListener("click", () => {
  ipcRenderer.send("encode", encodeInput.value);
});

ipcRenderer.on("encoded", (event, arg) => {
  encodeOutput.value = arg;
});


// Decode
const decodeButton = document.getElementById("decode-button");
const decodeInput = document.getElementById("decode-input");
const decodeOutput = document.getElementById("decode-output");

decodeButton.addEventListener("click", () => {
  ipcRenderer.send("decode", decodeInput.value);
});

ipcRenderer.on("decoded", (event, arg) => {
  decodeOutput.value = arg;
});


// GeoIP
const geoipButton = document.getElementById("geoip-button");
const geoipInput = document.getElementById("geoip-input");
const geoipOutput = document.getElementById("geoip-output");

geoipButton.addEventListener("click", () => {
  ipcRenderer.send("geoip", geoipInput.value);
});

ipcRenderer.on("geoipres", (event, arg) => {
  const { status, message, country, region, city, zip, lat, lon, timezone, isp, reverse, mobile, proxy, hosting } = JSON.parse(arg);
  if (status != "success") {
    geoipOutput.value = message;
    return;
  }
  const formattedResult = `Country/State: ${country}, ${region}\nCity: ${zip} ${city}\nLocation: ${lat}, ${lon}\nTimezone: ${timezone}\nISP: ${isp}\nMobile: ${mobile}\nVPN: ${proxy}\nHosting: ${hosting}`;
  geoipOutput.value = formattedResult;
});


// Password Generator
const generateButton = document.getElementById("generate-password");
const passwordOutput = document.getElementById("password-output");
const passwordLength = document.getElementById("length");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

generateButton.addEventListener("click", () => {
  ipcRenderer.send("generate", {
    length: passwordLength.value,
    uppercase: uppercase.checked,
    lowercase: lowercase.checked,
    numbers: numbers.checked,
    symbols: symbols.checked,
  });
});

ipcRenderer.on("generated", (event, arg) => {
  passwordOutput.value = arg;
});


// QR Code Generator
const qrButton = document.getElementById("qr-button");
const qrInput = document.getElementById("qr-input");
const qrOutput = document.getElementById("qr-output");

qrButton.addEventListener("click", () => {
  if (qrInput.value == "") {
    alert("Please enter a value to generate a QR code.");
    return;
  } else if (qrInput.value.length > 1000) {
    alert("Please enter a value less than 1000 characters.");
    return;
  } else {
    ipcRenderer.send("qr", qrInput.value);
}
});

ipcRenderer.on("qrres", (event, arg) => {
  qrOutput.innerHTML = arg;
});


// Steganography Conceal
const concealButton = document.getElementById("conceal-button");
const concealFileInput = document.getElementById("conceal-file-input");
const concealTextInput = document.getElementById("conceal-text-input");
const concealOutput = document.getElementById("conceal-output");

concealButton.addEventListener("click", () => {
  const file = concealFileInput.files[0];
  if (file.type !== 'image/png') {
    alert('Please upload a PNG file.');
    return;
  } else {
    ipcRenderer.send("conceal", {
      file: concealFileInput.files[0].path,
      text: concealTextInput.value,
    });
  }
});

concealFileInput.addEventListener('drop', (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  if (file.type === 'image/png') {
    // Proceed with the PNG file
  } else {
    alert('Please upload a PNG file.');
  }
});

ipcRenderer.on("concealed", (event, arg) => {
  concealOutput.innerHTML = arg;
});


// Steganography Reveal
const revealButton = document.getElementById("reveal-button");
const revealFileInput = document.getElementById("reveal-file-input");
const revealOutput = document.getElementById("reveal-output");

revealButton.addEventListener("click", () => {
  const file = revealFileInput.files[0];
  if (file.type === 'image/png') {
    ipcRenderer.send("reveal", revealFileInput.files[0].path);
  } else {
    alert('Please upload a PNG file.');
  }
});

revealFileInput.addEventListener('drop', (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  if (file.type === 'image/png') {
    // Proceed with the PNG file
  } else {
    alert('Please upload a PNG file.');
  }
});

ipcRenderer.on("revealed", (event, arg) => {
  revealOutput.innerHTML = arg;
});