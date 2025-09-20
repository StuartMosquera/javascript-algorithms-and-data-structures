const changeDue = document.getElementById('change-due');
const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const total = document.querySelector('.total');
const drawer = document.querySelector('.drawer');

const DENOM_NAMES = [
  'Pennies',
  'Nickels',
  'Dimes',
  'Quarters',
  'Ones',
  'Fives',
  'Tens',
  'Twenties',
  'Hundreds'
];
const CURRENCY_VALUES = {
  'PENNY': 0.01,
  'NICKEL': 0.05,
  'DIME': 0.10,
  'QUARTER': 0.25,
  'ONE': 1.00,
  'FIVE': 5.00,
  'TEN': 10.00,
  'TWENTY': 20.00,
  'ONE HUNDRED': 100.00
};

let price = 3.26;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

total.innerHTML = `<p>Total: $${price}</p>`;

function cashRegister() {
  const cashFloat = parseFloat(cash.value);

  if (isNaN(cashFloat)) {
    return;
  }

  if (cashFloat < price) {
    alert('Customer does not have enough money to purchase the item');
  } else if (cashFloat === price) {
    displayChangeDue(`<p>No change due - customer paid with exact cash</p>`);
  } else {
    const payment = round(cashFloat);
    const change = round(payment - price);
    updateStatus(change);
    return;
  }

  cash.value = '';
}

function displayChangeDue(message) {
  changeDue.innerHTML = '';
  changeDue.style.textAlign = message.includes('Status') ? 'left' : 'center';
  changeDue.innerHTML = message;
}

function updateStatus(change) {
  const totalCid = round(cid.reduce((accumulator, currentValue) =>
    accumulator + currentValue[1], 0)
  );
  const changeArray = calculateChange(change);
  const totalChangeGiven = round(changeArray.reduce((accumulator, currentValue) =>
    accumulator + currentValue[1], 0)
  );

  if (change > totalCid || totalChangeGiven < change) {
    displayChangeDue(`<p>Status: INSUFFICIENT_FUNDS</p>`);
    return;
  }

  let changeHTML = `<p>Status: ${change === totalCid ? 'CLOSED' : 'OPEN'}<p>`;
  cash.value = '';

  changeArray.forEach(denom => changeHTML += `<p>${denom[0]}: $${denom[1]}</p>`);
  displayChangeDue(changeHTML);
  updateDrawer();
}

function calculateChange(change) {
  const changeArray = [];

  for (let i = cid.length - 1; i >= 0; i--) {
    const denomName = cid[i][0];
    let denomAmount = cid[i][1];
    const denomValue = CURRENCY_VALUES[denomName];
    let amountToGive = 0;

    while (change >= denomValue && denomAmount > 0) {
      change = round(change - denomValue);
      denomAmount = round(denomAmount - denomValue);
      amountToGive = round(amountToGive + denomValue);
    }

    if (amountToGive > 0) {
      changeArray.push([denomName, amountToGive]);
      cid[i][1] = round(denomAmount);
    }
  }

  return changeArray;
}

function updateDrawer() {
  drawer.innerHTML = '';
  drawer.innerHTML = `<h2>Change in drawer:</h2>`;

  for (let i = 0; i < cid.length; i++) {
    const pTag = document.createElement('p');
    pTag.textContent = `${DENOM_NAMES[i]}: $${cid[i][1]}`;
    drawer.appendChild(pTag);
  }
}

const round = num => Math.round(num * 100) / 100;

purchaseBtn.onclick = () => cashRegister();

cash.onkeydown = function (event) {
  if (event.key === 'Enter') {
    cashRegister();
  }
};

updateDrawer();
