export function getRandomIntegerNumber(min, max) {
  if (min <= 0) {
    min = 0;
  }
  if (max < min) {
    const temp = min;
    min = max;
    max = temp;
  }
  const rand = Math.round(Math.random() * (max - min) + min);
  return rand;
}
