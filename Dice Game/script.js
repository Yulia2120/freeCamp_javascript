const listOfAllDice = document.querySelectorAll(".die");
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const currentRoundText = document.getElementById("current-round");
const currentRoundRollsText = document.getElementById("current-round-rolls");
const totalScoreText = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");
const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rulesContainer = document.querySelector(".rules-container");
const rulesBtn = document.getElementById("rules-btn");

let isModalShowing = false;
let diceValuesArr = [];
let rolls = 0;
let score = 0;
let totalScore = 0;
let round = 1;

const rollDice = () => {
  diceValuesArr = [];
  for (let i = 0; i < 5; i++) {
    //Генерировать случайное число между 1 и 6 (включительно) и округлить до целого
    const randomDice = Math.floor(Math.random() * 6) + 1;
    diceValuesArr.push(randomDice);
  }
  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index];
  });
};

const updateStats = () => {
  currentRoundRollsText.textContent = rolls;
  currentRoundText.textContent = round;
};

const updateRadioOption = (optionNode, score) => {
  scoreInputs[optionNode].disabled = false;
  scoreInputs[optionNode].value = score;
  scoreSpans[optionNode].textContent = `, score = ${score}`;
};

const updateScore = (selectedValue, achieved) => {
  totalScore += parseInt(selectedValue);
  totalScoreText.textContent = totalScore;
  scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`;
};

//алгоритм подсчета для Three of a kind and Four of a kind
const getHighestDuplicates = (arr) => {
  const counts = {};
  for (const num of arr) {
    //Проверить, существует ли num-ключ в объекте counts
    if (counts[num]) {
      counts[num]++;
    } else {
      counts[num] = 1;
    }
  }
  //подсчитываем дубликаты в массиве чисел
  let highestCount = 0;
  for (const num of arr) {
    const count = counts[num];
    if (count >= 3 && count > highestCount) {
      highestCount = count;
    }
    if (count >= 4 && count > highestCount) {
      highestCount = count;
    }
  }
  const sumOfAllDice = diceValuesArr.reduce((a, b) => a + b, 0);
  if (highestCount >= 4) {
    updateRadioOption(1, sumOfAllDice);
  }
  if (highestCount >= 3) {
    updateRadioOption(0, sumOfAllDice);
  }
  updateRadioOption(5, 0);
};

//алгоритм подсчета для full house
const detectFullHouse = (arr) => {
  const counts = {};
  for (const num of arr) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }
  const hasThreeOfAKind = Object.values(counts).includes(3);
  const hasPair = Object.values(counts).includes(2);
  if (hasThreeOfAKind && hasPair) {
    updateRadioOption(2, 25);
  }
  updateRadioOption(5, 0);
};

// small straight - это когда четыре кости имеют последовательные значения (Ех. 1234),
// в результате чего получается 30 очков;
// large straight, когда все пять кубиков имеют последовательные значения(Ех. 12345), в результате чего в счет 40 очков.

//алгоритм подсчета для small straight and large straight
const checkForStraights = (arr) => {
  const sortedNumbersArr = arr.sort((a, b) => a - b);
  //Чтобы проверить наличие только уникальных чисел, вам нужно будет использовать Set() для сортировки NumbersArr.
  //Преобразовать результат в массив с помощью оператора распространения.
  const uniqueNumbersArr = [...new Set(sortedNumbersArr)];
  const uniqueNumbersStr = uniqueNumbersArr.join("");

  //Есть в общей сложности З возможности для small straight: "1234", "2345" и "3456".
  const smallStraightsArr = ["1234", "2345", "3456"];

  //Есть только две возможности для large straight: "12345" и "23456".
  const largeStraightsArr = ["12345", "23456"];

  if (smallStraightsArr.includes(uniqueNumbersStr)) {
    updateRadioOption(3, 30);
  }
  if (largeStraightsArr.includes(uniqueNumbersStr)) {
    updateRadioOption(4, 40);
  }
  updateRadioOption(5, 0);
};

//reset inputs and spans
const resetRadioOption = () => {
  scoreInputs.forEach((input) => {
    input.disabled = true;
    input.checked = false;
  });
  scoreSpans.forEach((span) => {
    span.textContent = "";
  });
};

const resetGame = () => {
  diceValuesArr = [0, 0, 0, 0, 0];
  score = 0;
  totalScore = 0;
  rolls = 0;
  round = 1;
  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index];
  });
  totalScoreText.textContent = totalScore;
  scoreHistory.innerHTML = "";

  currentRoundRollsText.textContent = rolls;
  currentRoundText.textContent = round;

  resetRadioOption();
};

rollDiceBtn.addEventListener("click", () => {
  if (rolls === 3) {
    alert("You have made three rolls this round. Please select a score.");
  } else {
    rolls++;
    resetRadioOption();
    rollDice();
    updateStats();
    getHighestDuplicates(diceValuesArr);
    detectFullHouse(diceValuesArr);
    checkForStraights(diceValuesArr);
  }
});

rulesBtn.addEventListener("click", () => {
  isModalShowing = !isModalShowing;
  if (isModalShowing) {
    rulesBtn.textContent = "Hide Rules";
    rulesContainer.style.display = "block";
  } else {
    rulesBtn.textContent = "Show Rules";
    rulesContainer.style.display = "none";
  }
});

keepScoreBtn.addEventListener("click", () => {
  let selectedValue;
  let achieved;
  for (const radioButton of scoreInputs) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      achieved = radioButton.id;
      break;
    }
  }
  if (selectedValue) {
    rolls = 0;
    round++;
    updateStats();
    resetRadioOption();
    updateScore(selectedValue, achieved);
    if (round > 6) {
      setTimeout(() => {
        alert(`Game Over! Your total score is ${totalScore}`);
        resetGame();
      }, 500);
    }
  } else {
    alert("Please select an option or roll the dice");
  }
});
