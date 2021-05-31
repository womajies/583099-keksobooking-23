function swapRangeValue (max, min) {
  if (max < min) {
    const temp = min;
    min = max;
    max = temp;
    return max, min;
  }
}

function getRandomIntegerNumber(min, max) {
  swapRangeValue(max, min);
  if (min <= 0) {
    min = 0;
  }
  const rand = Math.round(Math.random() * (max - min) + min);
  console.log(rand);
  return rand;
}

function getRandomFractionalNumber(min, max, quantityCharAfterComma) {
  swapRangeValue(max, min);
  if (min <= 0) {
    min = 0;
  }
  const rand = (Math.random() * (max - min) + min).toFixed(quantityCharAfterComma);
  console.log(rand);
  return rand;
}

getRandomIntegerNumber(10, 1);
getRandomFractionalNumber(10, 1, 5);
