// const a = () => {
//   return "freeCodeCamp " + b();
// };
// const b = () => {
//   return "is " + c();
// };
// const c = () => {
//   return "awesome!";
// };
// console.log(a()); // пример работы стека(steck)

const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const animationContainer = document.getElementById("animation-container");
const animationData = [
  {
    inputVal: 5,
    marginTop: 300,
    addElDelay: 1000,
    msg: 'decimalToBinary(5) returns "10" + 1 (5 % 2). Then it pops off the stack.',
    showMsgDelay: 15000,
    removeElDelay: 20000,
  },
  {
    inputVal: 2,
    marginTop: -200,
    addElDelay: 1500,
    msg: 'decimalToBinary(2) returns "1" + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.',
    showMsgDelay: 10000,
    removeElDelay: 15000,
  },
  {
    inputVal: 1,
    marginTop: -200,
    addElDelay: 2000,
    msg: 'decimalToBinary(1) returns "1" (base case) and gives that value to the stack below. Then it pops off the stack.',
    showMsgDelay: 5000,
    removeElDelay: 10000,
  },
];

/**
 * При написании рекурсивного случая нужно помнить две вещи:
 * 1. Что такое базовый случай? (когда рекурсия создает вечный цикл)
 * 2. Какое наименьшее количество работы вам нужно сделать, чтобы приблизиться к базовому делу?
 */
// const countDownAndUp = (number) => {
//   console.log("Reached base case");
//   if (number === 0) {
//     return;
//   } else {
//     countDownAndUp(number - 1);
//     console.log(number);
//   }
// };

/*
const decimalToBinary = (input) => {
  const inputs = [];
  const quotients = [];
  const remainders = [];

  if (input === 0) {
    result.innerText = "0";
    return;
  }

  while (input > 0) {
    //гарантия того, что цикл не станет бесконечным
    const quotient = Math.floor(input / 2);
    const remainder = input % 2;
    inputs.push(input);
    quotients.push(quotient);
    remainders.push(remainder);
    input = quotient;
  }

  console.log("Inputs: ", inputs);
  console.log("Quotients: ", quotients);
  console.log("Remainders: ", remainders);

  result.innerText = remainders.reverse().join("");
};
*/
const decimalToBinary = (input) => {
  if (input === 0 || input === 1) {
    return String(input);
  } else {
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
  }
};

const showAnimation = () => {
  /* Хотя асинхронный код может быть трудным для понимания на первый взгляд, 
  он имеет много преимуществ. Одним из самых важных является то, что он позволяет писать не блокирующий код. */
  //   setTimeout(() => {
  //     console.log("free");
  //   }, 500);
  //   setTimeout(() => {
  //     console.log("Code");
  //   }, 1000);
  //   setTimeout(() => {
  //     console.log("Camp");
  //   }, 1500);
  result.innerText = "Call Stack Animation";

  animationData.forEach((obj) => {
    setTimeout(() => {
      animationContainer.innerHTML += `
        <p class="animation-frame" id="${obj.inputVal}" style="margin-top: ${obj.marginTop}px;">
        decimalToBinary(${obj.inputVal})
        </p>
      `;
    }, obj.addElDelay);
    setTimeout(() => {
      document.getElementById(obj.inputVal).textContent = obj.msg;
    }, obj.showMsgDelay);
    setTimeout(() => {
      document.getElementById(obj.inputVal).remove();
    }, obj.removeElDelay);
  });
  setTimeout(() => {
    result.textContent = decimalToBinary(5);
  }, 20000);
};

/** Потому что элемент type="number" позволяет использовать специальные символы вроде . +, и ё,
 * пользователи могут вводить числа типа 2.2, уравнения типа 2e+3 или даже просто e, что вы не хотите допускать.
 *
 * Хорошим способом проверки и нормализации чисел в JavaScript является использование встроенной функции parseInt(),
 * которая преобразует строку в целое или целое число. parseInt() берёт по меньшей мере один аргумент,
 *  строку, которая преобразуется в целое, и возвращает либо целое число, либо NaN, которое обозначает Не число. Например:
 * 
 *  parseInt(2.2); // 2
    parseInt("2e+3"); // 2
    parseInt("e") // NaN
 * */
/**
 * Далее нужно проверить, является ли значение, возвращаемое функцией parseInt(), числом или нет.
 * Для этого можно использовать функцию isNaN().
 * Эта функция принимает строку или число в качестве аргумента и возвращает true, если она вычисляет в NaN. Например:
 * isNaN("test"); // true
    isNaN(2); // false
    isNaN("3.5"); // false
 */

const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);

  if (!numberInput.value || isNaN(inputInt)) {
    alert("Please provide a decimal number");
    return;
  }
  //console.log(numberInput.value);
  if (inputInt === 5) {
    showAnimation();
    return;
  }
  result.textContent = decimalToBinary(inputInt);
  numberInput.value = "";
};

convertBtn.addEventListener("click", checkUserInput);
numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});
