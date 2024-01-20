const checkButton = document.getElementById("check-btn");
const textInput = document.getElementById("text-input");
const resultElement = document.getElementById("result");

function isPalindrome(text) {
  /* (/[^A-Za-z0-9]/gi, ''): Это регулярное выражение заменяет все символы, 
  не являющиеся буквами латинского алфавита(A - Z, a - z) и цифрами(0 - 9), на пустую строку.
   Параметр gi означает, что замена производится вне зависимости от регистра(g - глобально) и с учетом регистра(i - регистронезависимо).*/
  const cleanedText = text.toLowerCase().replace(/[^A-Za-z0-9]/gi, "");

  // Сравниваем текст с его обратным порядком

  return cleanedText === cleanedText.split("").reverse().join("");
}

// Функция, которая будет вызываться при клике на кнопку
function checkPalindrome() {
  // Получаем текст из поля ввода
  const inputValue = textInput.value.trim();

  // Проверяем, является ли текст пустой строкой
  if (inputValue === "") {
    alert("Please input a value");
    return;
  }

  // Создаем элемент <p> с классом "user-input"
  const paragraph = document.createElement("p");
  paragraph.classList.add("user-input");

  // Создаем новый элемент <strong>
  const strongElement = document.createElement("strong");
  // Создаем текстовое содержимое для strong элемента
  const strongText = document.createTextNode(inputValue);
  // Добавляем текстовое содержимое к strong элементу
  strongElement.appendChild(strongText);
  // Добавляем strong элемент к параграфу
  paragraph.appendChild(strongElement);
  // Проверяем, является ли текст палиндромом и Выводим результат на страницу
  const textNode = document.createTextNode(
    isPalindrome(inputValue) ? " is a palindrome" : " is not a palindrome"
  );
  paragraph.appendChild(textNode);

  //  Очищаем контейнер перед добавлением нового параграфа
  resultElement.innerHTML = "";
  //   resultElement.appendChild(paragraph);
  resultElement.appendChild(paragraph);

  resultElement.classList.remove("hidden");
}

checkButton.addEventListener("click", checkPalindrome);
