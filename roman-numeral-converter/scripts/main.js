const num = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');

const ROMAN_NUMS = new Map([
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I']
]);

function showRomanNum(number) {
  if (isNaN(number)) {
    displayResult(`<p>Please enter a valid number.</p>`);
    return;
  }

  if (number <= 0) {
    displayResult(`<p>Please enter a number greater than or equal to 1</p>`);
  } else if (number >= 4000) {
    displayResult(`<p>Please enter a number less than or equal to 3999</p>`);
  } else {
    displayResult(`<p>${arabicToRoman(number)}</p>`);
  }
}

function displayResult(message) {
  if (getComputedStyle(output).display === 'none') {
    output.style.display = 'block';
  }

  const styles = message.includes('Please') ? {
    backgroundColor: '#ffa6a6',
    borderColor: '#8e0505',
    color: '#8e0505',
    fontSize: '1.6em'
  } : {
    backgroundColor: '#3c3c50',
    borderColor: '#fff',
    color: 'inherit',
    fontSize: '2em'
  };

  Object.assign(output.style, styles);

  output.innerHTML = message;
}

function arabicToRoman(number) {
  let result = '';

  for (const [value, numeral] of ROMAN_NUMS) {
    while (number >= value) {
      number -= value;
      result += numeral;
    }
  }

  return result;
}

convertBtn.onclick = () => showRomanNum(parseInt(num.value));

num.onkeydown = function(event) {
  if (event.key === 'Enter') {
    showRomanNum(parseInt(num.value));
  }
};
