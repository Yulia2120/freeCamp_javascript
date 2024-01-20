// const getMean = (array) => {
//   const sum = array.reduce((acc, el) => acc + el, 0);
//   const mean = sum / array.length;
//   return mean;
// };
//метод неявного возврата функции
//вычисление среднего из набора чисел
const getMean = (array) =>
  array.reduce((acc, el) => acc + el, 0) / array.length;

//вычисление медианы. Медиана - это середина набора чисел.
const getMedian = (array) => {
  const sorted = array.slice().sort((a, b) => a - b);
  const median =
    array.length % 2 === 0
      ? getMean([sorted[array.length / 2], sorted[array.length / 2 - 1]])
      : sorted[Math.floor(array.length / 2)];
  return median;
};

//Mode(режим) списка чисел - это число, которое чаще всего появляется в списке.
const getMode = (array) => {
  const counts = {};
  array.forEach((el) => {
    counts[el] = (counts[el] || 0) + 1;
  });
  if (new Set(Object.values(counts)).size === 1) {
    return null;
  }
  const highest = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
  const mode = Object.keys(counts).filter(
    (el) => counts[el] === counts[highest]
  );
  return mode.join(", ");
};

//Ваш следующий расчет - это диапазон, который представляет собой разницу между наибольшими и наименьшими числами в списке.
const getRange = (array) => {
  return Math.max(...array) - Math.min(...array);
};

//Дисперсия рядов показывает, насколько данные отклоняются от среднего значения,
//и может использоваться для определения степени распространения данных.Дисперсия рассчитывается в несколько этапов.
const getVariance = (array) => {
  const mean = getMean(array);
  const variance =
    array.reduce((acc, el) => {
      const difference = el - mean;
      const squared = difference ** 2;
      return acc + squared;
    }, 0) / array.length;
  return variance;
};

//Ваш окончательный расчет - стандартное отклонение, которое является квадратным корнем дисперсии.
const getStandardDeviation = (array) => {
  const variance = getVariance(array);
  const standardDeviation = Math.sqrt(variance);
  return standardDeviation;
};

const calculate = () => {
  const value = document.querySelector("#numbers").value;
  //разделяем введенное значение запятой и произвольным кол-вом пробелов
  const array = value.split(/,\s*/g);
  /**
   * Значение входного элемента всегда является строкой,
   * даже если входной тип является числом.
   * Необходимо преобразовать этот массив строк в массив чисел.
   * Для этого можно использовать метод .map().
   * Помните, что .map() создаёт новый массив, а не изменяет первоначальный массив.
   */

  /**
   * Пользователь может поместить любой нужный ему текст в поле ввода. Вы хотите убедиться,
   * что вы работаете только с номерами.
   * Конструктор Number() возвращает NaN (который обозначает "не число"),
   * если переданное ему значение не может быть преобразовано в число.
   */
  /**
   * Функция обратного вызова должна возвращать логическое значение, которое указывает,
   * должен ли элемент быть включен в новый массив.
   * В этом случае требуется вернуть true, если элемент не является NaN (не является числом).
   * Используйте .filter() с функцией обратного вызова, чтобы включить только значения, не являющиеся NaN
   */
  const numbers = array.map((el) => Number(el)).filter((el) => !isNaN(el));
  const mean = getMean(numbers);
  const median = getMedian(numbers);
  const mode = getMode(numbers);
  const range = getRange(numbers);
  const variance = getVariance(numbers);
  const standardDeviation = getStandardDeviation(numbers);

  document.querySelector("#mean").textContent = mean;
  document.querySelector("#median").textContent = median;
  document.querySelector("#mode").textContent = mode;
  document.querySelector("#range").textContent = range;
  document.querySelector("#variance").textContent = variance;
  document.querySelector("#standardDeviation").textContent = standardDeviation;
};
