// DOM VARIABLES
const userInput = document.getElementById("user-input");
const resultsDiv = document.getElementById("results-div");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");

// GLOBAL VARIABLES 
const phoneRegex = /^(1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/;

// FUNCTIONS
const checkValue = value => {
  if (value === "") {
    alert("Please provide a phone number");
  } else if (phoneRegex.test(value)) {
    const newElement = document.createElement("p");
    newElement.innerHTML = `Valid US number: ${value}`;
    newElement.className = "valid";
    resultsDiv.appendChild(newElement);
  } else {
    const newElement = document.createElement("p");
    newElement.innerHTML = `Invalid US number: ${value}`;
    resultsDiv.appendChild(newElement);
  }
  userInput.value = "";
};

const clearValues = () => {
  resultsDiv.innerHTML = "";
};

// EVENTS
checkBtn.onclick = function () {
  const inputValue = userInput.value;
  checkValue(inputValue);
};

clearBtn.onclick = function () {
  clearValues();
};

userInput.onkeydown = function (event) {
  if (event.key === "Enter") {
    const inputValue = userInput.value;
    checkValue(inputValue);
  }

  if (event.key === "Delete") {
    clearValues();
  }
};

// Made by Stuart Mosquera