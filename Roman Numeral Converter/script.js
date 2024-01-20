const numberInput = document.getElementById("number");
const convertButton = document.getElementById("convert-btn");
const output = document.getElementById("output");
const alert = document.getElementsByClassName("alert");

const romanNumerals = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

const arabicToRoman = (input) => {
  let result = "";
  for (const key in romanNumerals) {
    while (input >= romanNumerals[key]) {
      result += key;
      input -= romanNumerals[key];
    }
  }

  return result;
};

const checkUserInput = () => {
  if (!numberInput.value) {
    alert[0].textContent = "Please enter a valid number";
  } else if (numberInput.value <= 0) {
    alert[0].textContent = "Please enter a number greater than or equal to 1";
  } else if (numberInput.value >= 4000) {
    alert[0].textContent = "Please enter a number less than or equal to 3999";
  } else {
    alert[0].textContent = "";
    output.textContent = arabicToRoman(numberInput.value);
    numberInput.value = "";
  }
};
convertButton.addEventListener("click", checkUserInput);
numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});
