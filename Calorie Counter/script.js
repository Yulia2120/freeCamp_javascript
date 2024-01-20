const calorieCounter = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");
let isError = false;

// function cleanInputString(str) {
//   const strArray = str.split("");
//   const cleanStrArray = [];

//   for (let i = 0; i < strArray.length; i++) {
//     //   проверяем не является ли символ +, -, или пробелом
//     if (!["+", "-", " "].includes(strArray[i])) {
//       // если проверка пройдена, то заполняем массив cleanStrArray
//       cleanStrArray.push(strArray[i]);
//     }
//   }
// }

// для ускорения работы кода используются регулярные выражения
function cleanInputString(str) {
  // \s обозначает пробел; \+ экранируем обратным слешем
  // const regex = /\+-\s/;
  // когда мы используем [] нам не нужно экранировать + слешем
  const regex = /[+-\s]/g;
  return str.replace(regex, "");
}
//Регекс также может принимать определенные флаги для изменения поведения соответствия шаблона.
// Флаги добавляются после закрытия /.Флаг g, который означает "глобальный",
//скажет шаблону продолжать следить за ним после того, как он найдет совпадение.

function isInvalidInput(str) {
  // флаг i обозначает "нечувствительный к регистру"
  // const regex = /[0-9]+e[0-9]+/i;
  // \d заменяет все цифры
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

function addEntry() {
  const targetInputContainer = document.querySelector(
    `#${entryDropdown.value} .input-container`
  );
  //получаем количество записей
  const entryNumber =
    targetInputContainer.querySelectorAll('input[type="text"]').length + 1;

  // В JavaScript вы можете использовать строку для представления HTML-разметки.
  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" placeholder="Name" id="${entryDropdown.value}-${entryNumber}-name"/>
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input type="number" min="0" placeholder="Calories" id="${entryDropdown.value}-${entryNumber}-calories"/>
  `;
  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
}

function getCaloriesFromInputs(list) {
  let calories = 0;

  for (let i = 0; i < list.length; i++) {
    const currVal = cleanInputString(list[i].value);
    //проверка ввода
    const invalidInputMatch = isInvalidInput(currVal);
    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
}

function calculateCalories(e) {
  e.preventDefault();
  isError = false;
  const breakfastNumberInputs = document.querySelectorAll(
    "#breakfast input[type=number]"
  );
  const lunchNumberInputs = document.querySelectorAll(
    "#lunch input[type=number]"
  );
  const dinnerNumberInputs = document.querySelectorAll(
    "#dinner input[type=number]"
  );
  const snacksNumberInputs = document.querySelectorAll(
    "#snacks input[type=number]"
  );
  const exerciseNumberInputs = document.querySelectorAll(
    "#exercise input[type=number]"
  );

  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);

  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  if (isError) {
    return;
  }

  const consumedCalories =
    breakfastCalories +
    lunchCalories +
    dinnerCalories +
    snacksCalories +
    exerciseCalories;

  const remainingCalories =
    budgetCalories - consumedCalories + exerciseCalories;

  const surplusOrDeficit = remainingCalories >= 0 ? "Surplus" : "Deficit";

  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(
    remainingCalories
  )} Calorie ${surplusOrDeficit}</span>
  <hr/>
  <p>${budgetCalories} Calories Budgeted</p>
   <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
  `;

  output.classList.remove("hide");
}

addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);

// функия очистки содержимого
function clearForm() {
  const inputContainers = Array.from(
    document.querySelectorAll(".input-container")
  );

  for (let i = 0; i < inputContainers.length; i++) {
    inputContainers[i].innerHTML = "";
  }

  budgetNumberInput.value = "";
  output.innerText = "";
  output.classList.add("hide");
}
clearButton.addEventListener("click", clearForm);
