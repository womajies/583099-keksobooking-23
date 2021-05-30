function swapRangeValue (max, min) {
  if (max < min) {
    const temp = min;
    min = max;
    max = temp;
  }
}

function getRandomIntegerNumber(min, max) {
  swapRangeValue();
  if (min <= 0) {
    min = 0;
  }
  const rand = Math.round(Math.random() * (max - min) + min);
  return rand;
}

function getRandomFractionalNumber(min, max, quantityCharAfterComma) {
  swapRangeValue();
  if (min <= 0) {
    min = 0;
  }
  const rand = (Math.random() * (max - min) + min).toFixed(quantityCharAfterComma);
  return rand;
}

getRandomIntegerNumber(10, 1);
getRandomFractionalNumber(10, 1, 5);
