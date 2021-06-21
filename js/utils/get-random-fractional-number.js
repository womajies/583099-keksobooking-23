export function getRandomFractionalNumber(min, max, quantityCharAfterComma) {
  if (min <= 0) {
    min = 0;
  }
  if (max < min) {
    const temp = min;
    min = max;
    max = temp;
  }
  const rand = (Math.random() * (max - min) + min).toFixed(quantityCharAfterComma);
  return rand;
}
