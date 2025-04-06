// DOM VARIABLES
const num = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

// GLOBAL VARIABLES
const romanNums = {
  1000: "M",
  900: "CM",
  500: "D",
  400: "CD",
  100: "C",
  90: "XC",
  50: "L",
  40: "XL",
  10: "X",
  9: "IX",
  5: "V",
  4: "IV",
  1: "I",
};

// FUNCTIONS
const showRomanNum = input => {
  output.style.display = "block";
  output.style.marginTop = "2rem";
  if (isNaN(input)) {
    output.innerHTML = `<p>Please enter a valid number.</p>`;
  } else {
    if (input <= 0) {
      output.innerHTML = `<p>Please enter a number greater than or equal to 1</p>`;
    } else if (input >= 4000) {
      output.innerHTML = `<p>Please enter a number less than or equal to 3999</p>`;
    } else {
      output.innerHTML = `<p>${arabicToRoman(input)}</p>`;
    }
  }
};

const arabicToRoman = num => {
  let result = "";
  for (const key of Object.keys(romanNums).reverse()) {
    while (num >= key) {
      num -= key;
      result += romanNums[key];
    }
  }
  return result;
};

// EVENTS
convertBtn.onclick = function () {
  const inputValue = parseInt(num.value);
  showRomanNum(inputValue);
};

num.onkeydown = function (event) {
  if (event.key === "Enter") {
    const inputValue = parseInt(num.value);
    showRomanNum(inputValue);
  }
};

// Made by Stuart Mosquera