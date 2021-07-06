import {createObject} from './create-object.js';
import {isEmpty} from '../utils/is-empty.js';
import {dataSwitching} from '../utils/data-switching.js';
import {dataChecking} from '../utils/data-checking.js';

const createAdElement = (object) => {
  const templateFragment = document.querySelector('#card').content;
  const template = templateFragment.querySelector('.popup');
  const ad = template.cloneNode(true);
  const adTitle = ad.querySelector('.popup__title');
  const adTextAdress = ad.querySelector('.popup__text--address');
  const adTextPrice = ad.querySelector('.popup__text--price');
  const adTextCapacity = ad.querySelector('.popup__text--capacity');
  const adTextTime = ad.querySelector('.popup__text--time');
  const adDescr = ad.querySelector('.popup__description');

  isEmpty(adTitle, object.offer.title);
  isEmpty(adTextAdress, object.offer.address);
  isEmpty(adTextPrice, object.offer.price);
  adTextPrice.insertAdjacentHTML('beforeend', '<span>₽/ночь</span>');
  dataSwitching(object);
  dataChecking(object);

  adTextCapacity.textContent = `${object.offer.rooms} комнаты для ${object.offer.guests} гостей`;
  adTextTime.textContent = `Заезд после ${object.offer.checkin}, выезд до ${object.offer.checkout}`;
  const modifiers = object.offer.features.map((feature) => `popup__feature--${feature}`);
  ad.querySelectorAll('.popup__feature').forEach((el) => {
    const modifier = el.classList[1];
    if(!modifiers.includes(modifier)) {
      el.remove();
    }
  });

  isEmpty(adDescr, object.offer.description);
  const adPhotosList = ad.querySelector('.popup__photos');
  const photosFragment = document.createDocumentFragment();

  object.offer.photos.forEach((el) => {
    if(el === undefined) {
      adPhotosList.classList.add('hidden');
    } else {
      adPhotosList.classList.remove('hidden');
    }
    adPhotosList.textContent = '';
    const adPhoto = document.createElement('img');
    adPhoto.src = el;
    adPhoto.classList.add('popup__photo');
    adPhoto.width = '45';
    adPhoto.height = '40';
    adPhoto.alt = 'Фотография жилья';
    photosFragment.appendChild(adPhoto);
  });

  adPhotosList.appendChild(photosFragment);

  return ad;
};

const createAdsFragment = (objects) => {
  const fragment = document.createDocumentFragment();

  objects.forEach(() => {
    fragment.appendChild(createAdElement(createObject()));
  });

  return fragment;
};

export {createAdElement, createAdsFragment};
