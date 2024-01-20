const sortButton = document.getElementById("sort");

const sortInputArray = (event) => {
  event.preventDefault();
  const inputValues = [
    ...document.getElementsByClassName("values-dropdown"),
  ].map((dropdown) => Number(dropdown.value));

  // const sortedValues = bubbleSort(inputValues);
  //const sortedValues = selectionSort(inputValues);
  //const sortedValues = insertionSort(inputValues);

  /**
   * Обратите внимание, как 10-е значение помещается в начале массива. Это связано с поведением по умолчанию .
   *  sort() означает преобразование значений в строки и их сортировку по алфавиту. И 10 приходит перед 2 алфавитно.
   * Чтобы исправить это, можно передать функцию обратного вызова методу .sort().
   * Функция обратного вызова имеет два параметра - для вашего, используйте а и b. Оставьте функцию пустой.
   * Обратный вызов к .sort() должен возвращать число. Это число определяет, как сортировать элементы a и b:
   * Если число отрицательное, отсортируйте a перед b.
   * Если число положительное, отсортируйте b перед а.
   * Если число равно нулю, не меняйте порядок а и b.
   * С учетом того, что вы хотите, чтобы числа сортировались в порядке возрастания (от наименьшего до наибольшего),
   * верните один расчет вычитания с помощью а и Ь, которые правильно отсортируют числа с помощью приведенной выше логики.
   */
  const sortedValues = inputValues.sort((a, b) => {
    return a - b;
  });

  updateUI(sortedValues);
};

const updateUI = (array = []) => {
  array.forEach((num, i) => {
    const outputValueNode = document.getElementById(`output-value-${i}`);
    outputValueNode.innerText = num;
  });
};

// //bubbleSort
// const bubbleSort = (array) => {
//   for (let i = 0; i < array.length; i++) {
//     for (let j = 0; j < array.length - 1; j++) {
//       console.log(array, array[j], array[j + 1]);
//       if (array[j] > array[j + 1]) {
//         const temp = array[j];
//         array[j] = array[j + 1];
//         array[j + 1] = temp;
//       }
//     }
//   }
//   return array;
// };

// //selectionSort
// const selectionSort = (array) => {
//   for (let i = 0; i < array.length; i++) {
//     let minIndex = i;
//     for (let j = i + 1; j < array.length; j++) {
//       console.log(array, array[j], array[minIndex]);
//       if (array[j] < array[minIndex]) {
//         minIndex = j;
//       }
//     }
//     // Замена найденного минимального элемента на элемент с индексом i
//     const temp = array[i];
//     array[i] = array[minIndex];
//     array[minIndex] = temp;
//   }
//   return array;
// };

// //insertionSort
// const insertionSort = (array) => {
//   for (let i = 1; i < array.length; i++) {
//     const currValue = array[i];
//     let j = i - 1;
//     while (j >= 0 && array[j] > currValue) {
//       array[j + 1] = array[j];
//       j--;
//     }
//   }
//   return array;
// };

sortButton.addEventListener("click", sortInputArray);
