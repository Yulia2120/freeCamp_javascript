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

const cashInput = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const priceScreen = document.getElementById("price-screen");
const cashDrawerDisplay = document.getElementById("cash-in-drawer");
priceScreen.textContent = `Total: $${price}`;

const checkCashRegister = (price, cash, cid) => {
  let currencyUnit = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    "ONE HUNDRED": 100,
  };

  let changeCash = cash - price;
  let totalCid = Number(
    cid.reduce((sum, element) => sum + element[1], 0).toFixed(2)
  );

  if (totalCid < changeCash) {
    return { status: "INSUFFICIENT_FUNDS", change: [], cashInDrawer: cid };
  } else if (totalCid === changeCash) {
    return { status: "CLOSED", change: cid, cashInDrawer: [] };
  } else {
    let changeArray = [];

    for (let i = cid.length - 1; i >= 0; i--) {
      let currencyUnitName = cid[i][0];
      let currencyUnitValueTotal = cid[i][1];
      let currencyUnitValue = currencyUnit[currencyUnitName];
      let currencyUnitAmount = Number(
        (currencyUnitValueTotal / currencyUnitValue).toFixed(0)
      );
      console.log(`total: ${currencyUnitAmount}`);
      let currencyUnitsToReturn = 0;

      while (changeCash >= currencyUnitValue && currencyUnitAmount > 0) {
        changeCash -= currencyUnitValue;
        changeCash = Number(changeCash.toFixed(2));
        currencyUnitAmount--;
        currencyUnitsToReturn++;
      }
      if (currencyUnitsToReturn > 0) {
        changeArray.push([
          currencyUnitName,
          currencyUnitsToReturn * currencyUnitValue,
        ]);
      }
    }

    if (changeCash > 0) {
      changeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
      return { status: "INSUFFICIENT_FUNDS", change: [], cashInDrawer: cid };
    }

    // Обновим состояние "cash-in-drawer" после сдачи
    let updatedCid = cid.map((item) => {
      let changeItem = changeArray.find((change) => change[0] === item[0]);
      if (changeItem) {
        return [item[0], item[1] - changeItem[1]];
      } else {
        return item;
      }
    });

    return { status: "OPEN", change: changeArray, cashInDrawer: updatedCid };
  }
};

// Функция для форматирования сдачи
const formatChange = (change) => {
  return change.map((item) => `${item[0]}: $${item[1]}`).join("<br>");
};
//Функция вывода остатка в кассе
const formatMoney = (money) => {
  cashDrawerDisplay.innerHTML = `<p><strong>Change in drawer:</strong></p>
    ${money.map((money) => `<p>${money[0]}: $${money[1]}</p>`).join("")}
  `;
};
console.log(formatChange(cid));

purchaseBtn.addEventListener("click", () => {
  const cashInputValue = parseFloat(cashInput.value);

  if (isNaN(cashInputValue) || cashInputValue < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else if (cashInputValue === price) {
    changeDue.innerHTML =
      "<p>No change due - customer paid with exact cash</p>";
    cashInput.value = "";
    return;
  }
  const result = checkCashRegister(price, cashInputValue, cid);
  const formattedChange = formatChange(result.change);

  if (result.status === "INSUFFICIENT_FUNDS") {
    changeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>";
  } else if (result.status === "CLOSED") {
    changeDue.innerHTML = `<p>Status: CLOSED</p>${formattedChange}`;
  } else if (result.status === "OPEN") {
    changeDue.innerHTML = `<p>Status: OPEN</p>${formattedChange}`;
  }
  formatMoney(result.cashInDrawer);
});
