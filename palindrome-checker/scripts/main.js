// DOM Variables
const textInput = document.getElementById('text-input');
const checkBtn = document.getElementById('check-btn');
const result = document.getElementById('result');

// Main Function
function checkPalindrome(text) {
  if (!text) {
    alert('Please input a value');
    return;
  }

  const normalizedText = normalizeText(text);

  if (normalizedText.length === 1 || normalizedText === reverseText(normalizedText)) {
    displayResult(`${text} is a palindrome.`);
  } else {
    displayResult(`${text} is not a palindrome.`);
  }

  textInput.value = '';
}

// Helper Functions
const displayResult = message => result.textContent = message;

const normalizeText = text => text.toLowerCase().replace(/[^a-z0-9]/g, '');

const reverseText = text => text.split('').reverse().join('');

// Input Events
checkBtn.onclick = () => checkPalindrome(textInput.value);

textInput.onkeydown = function(event) {
  if (event.key === 'Enter') {
    checkPalindrome(textInput.value);
  }
};
