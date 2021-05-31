function getRandomIntegerNumber(min, max) {
  if (min <= 0) {
    min = 0;
  }
  console.log('Значения до свапа: ' + min, max);
  if (max < min) {
    const temp = min;
    min = max;
    max = temp;
  }
  console.log('Значения после свапа: ' + min, max);
  const rand = Math.round(Math.random() * (max - min) + min);
  console.log('Случайное число: ' + rand);
  return rand;
}

function getRandomFractionalNumber(min, max, quantityCharAfterComma) {
  if (min <= 0) {
    min = 0;
  }
  console.log('Значения до свапа: ' + min, max);
  if (max < min) {
    const temp = min;
    min = max;
    max = temp;
  }
  console.log('Значения после свапа: ' + min, max);
  const rand = (Math.random() * (max - min) + min).toFixed(quantityCharAfterComma);
  console.log('Случайное число: ' + rand);
  return rand;
}

getRandomIntegerNumber(10, 1);
getRandomFractionalNumber(10, 1, 5);
