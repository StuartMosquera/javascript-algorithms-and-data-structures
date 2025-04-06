// DOM VARIABLES
const changeDue = document.getElementById("change-due");
const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const total = document.getElementsByClassName("total-div")[0];
const drawer = document.getElementsByClassName("drawer-div")[0];

// GLOBAL VARIABLES
let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];
const currencyValues = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.10,
  "QUARTER": 0.25,
  "ONE": 1.00,
  "FIVE": 5.00,
  "TEN": 10.00,
  "TWENTY": 20.00,
  "ONE HUNDRED": 100.00,
};

// FUNCTIONS
const updateChangeDue = change => {
  const statusArr = ["INSUFFICIENT_FUNDS", "CLOSED", "OPEN"];
  change === 0 ? changeDue.innerHTML = `<p>No change due - customer paid with exact cash</p>`
    : change < 0 ? alert("Customer does not have enough money to purchase the item")
    : updateStatus(change, statusArr);
  cash.value = "";
};

const updateStatus = (change, status) => {
  let totalCid = Number(cid.reduce((accumulator, currentValue) => accumulator + currentValue[1], 0).toFixed(2));
  if (totalCid < change) {
    changeDue.innerHTML = `<p>Status: ${status[0]}</p>`;
    return;
  }
  
  let changeArray = [];
  for (let i = cid.length - 1; i >= 0; i--) {
    let denomName = cid[i][0];
    let denomTotal = cid[i][1];
    let denomValue = currencyValues[denomName];
    let amountToGive = 0;
    while (change >= denomValue && denomTotal > 0) {
      change = Number((change - denomValue).toFixed(2));
      denomTotal = Number((denomTotal - denomValue).toFixed(2));
      amountToGive = Number((amountToGive + denomValue).toFixed(2));
    }

    if (amountToGive > 0) {
      changeArray.push([denomName, amountToGive]);
      cid[i][1] = denomTotal;
    }
  }

  let remainingCid = Number(cid.reduce((accumulator, currentValue) => accumulator + currentValue[1], 0).toFixed(2));
  if (change > 0) {
    changeDue.innerHTML = `<p>Status: ${status[0]}</p>`;
  } else {
    let changeHTML = `<p>Status: ${remainingCid === 0 ? status[1] : status[2]}</p>`;
    changeArray.forEach(item => {
      changeHTML += `<p>${item[0]}: \$${item[1]}</p>`;
    });
    changeDue.innerHTML = changeHTML;
    updateDrawer();
  }
};

const updateDrawer = () => {
  drawer.innerHTML = `<h2>Change in drawer:</h2>`;
  cid.forEach(item => {
    const newElement = document.createElement("p");
    newElement.innerText = `${item[0].toLowerCase()}: \$${item[1]}`;
    drawer.appendChild(newElement);
  });
};

// EVENTS
purchaseBtn.onclick = function () {
  const inputValue = Number(cash.value);
  const totalChange = Number((inputValue - price).toFixed(2));
  if (cash.value === "") {
    return;
  } else {
    updateChangeDue(totalChange);
  }
};

cash.onkeydown = function (event) {
  if (event.key === "Enter") {
    const inputValue = Number(cash.value);
    const totalChange = Number((inputValue - price).toFixed(2));
    if (cash.value === "") {
      return;
    } else {
      updateChangeDue(totalChange);
    }
  }
};

total.innerHTML = `<p>Total: \$${price}</p>`;
updateDrawer();

// Made by Stuart Mosquera