function getRandomIntegerNumber(min, max) {
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

function getRandomFractionalNumber(min, max, quantityCharAfterComma) {
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

getRandomIntegerNumber(10, 1);
getRandomFractionalNumber(10, 1, 5);

const AVATAR = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
  'img/avatars/user09.png',
  'img/avatars/user10.png',
];
const TITLE = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг',
  'JSON Statham',
  'Арнольд Шварцниггер',
];
const ADDRESS = [
  'x:175 y:200',
  'x:125 y:100',
  'x:1600 y:2400',
  'x:100 y:95',
  'x:230 y:215',
  'x:420 y:25',
  'x:330 y:400',
  'x:65 y:40',
  'x:90 y:270',
  'x:465 y:355',
];
const PRICE = [
  1000,
  2000,
  3000,
  4000,
  5000,
  6000,
  7000,
  8000,
  9000,
  10000,
];
const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const ROOMS = [
  1,
  2,
  3,
  100,
];
const GUESTS = [
  0,
  1,
  2,
  3,
];
const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTION = [
  'Ленивое описание помещения №1',
  'Ленивое описание помещения №2',
  'Ленивое описание помещения №3',
  'Ленивое описание помещения №4',
  'Ленивое описание помещения №5',
  'Ленивое описание помещения №6',
  'Ленивое описание помещения №7',
  'Ленивое описание помещения №8',
  'Ленивое описание помещения №9',
  'Ленивое описание помещения №10',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const SIMILAR_AUTHOR_COUNT = 10;
const SIMILAR_OFFER_COUNT = 10;
const SIMILAR_LOCATION_COUNT = 10;

const getRandomArrayElement = (elements) => elements[getRandomIntegerNumber(0, elements.length - 1)];

let tempAmount = [];
const getRandomArrayString = (array) => {
  let getRandomMinValue = getRandomIntegerNumber(0, array.length - 1);
  let getRandomMaxValue = getRandomIntegerNumber(0, array.length - 1);
  if (getRandomMaxValue < getRandomMinValue) {
    const tempValue = getRandomMinValue;
    getRandomMinValue = getRandomMaxValue;
    getRandomMaxValue = tempValue;
  }
  tempAmount = [];
  for (let index = getRandomMinValue; index <= getRandomMaxValue; index++) {
    tempAmount.push(array[index]);
  }
  return tempAmount;
};

const createAuthor = () => ({
  avatar: getRandomArrayElement(AVATAR),
});

const createOffer = () => ({
  title: getRandomArrayElement(TITLE),
  address: getRandomArrayElement(ADDRESS),
  price: getRandomArrayElement(PRICE),
  type: getRandomArrayElement(TYPE),
  rooms: getRandomArrayElement(ROOMS),
  guests: getRandomArrayElement(GUESTS),
  checkin: getRandomArrayElement(CHECKIN),
  checkout: getRandomArrayElement(CHECKOUT),
  features: getRandomArrayString(FEATURES),
  description: getRandomArrayElement(DESCRIPTION),
  photos: getRandomArrayString(PHOTOS),
});

const createLocation = () => ({
  lat: getRandomFractionalNumber(35.65000, 35.70000, 5),
  lng: getRandomFractionalNumber(139.70000, 139.80000, 5),
});

new Array(SIMILAR_AUTHOR_COUNT).fill(null).map(() => createAuthor());
new Array(SIMILAR_OFFER_COUNT).fill(null).map(() => createOffer());
new Array(SIMILAR_LOCATION_COUNT).fill(null).map(() => createLocation());

