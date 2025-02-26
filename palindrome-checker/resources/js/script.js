// DOM VARIALBES
const textInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");

// FUNCTIONS
const checkPalindrome = input => {
  if (input === "") {
    alert("Please input a value");
  } else {
    const lowerInput = input.toLowerCase();
    if (input.length == 1) {
      result.innerHTML = `${input} is a palindrome.`;
    } else if (cleanStr(lowerInput) === reverseStr(cleanStr(lowerInput))) {
      result.innerHTML = `${input} is a palindrome.`;
    } else {
      result.innerHTML = `${input} is not a palindrome.`;
    }
  }
};

const reverseStr = str => {
  const reversedStr = str.split("").reverse().join("");
  return reversedStr;
};

const cleanStr = str => {
  const regex = /[ _,./():\-\\,]/g;
  return str.replace(regex, "");
};

// EVENTS
checkBtn.onclick = function () {
  const inputValue = textInput.value;
  checkPalindrome(inputValue);
};

textInput.onkeydown = function (event) {
  if (event.key === "Enter") {
    const inputValue = textInput.value;
    checkPalindrome(inputValue);
  }
};
// Made by Stuart Mosquera