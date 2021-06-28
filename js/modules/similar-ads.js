import {createObjects} from './create-object.js';

const similarAds = () => {
  const mapCanvas = document.querySelector('#map-canvas');
  const templateFragment = document.querySelector('#card').content;
  const template = templateFragment.querySelector('.popup');
  const fragment = document.createDocumentFragment();
  const saveObjects = createObjects();

  for(let i = 0; i <= saveObjects.length - 1; i++) {
    const index = saveObjects[i];
    const ad = template.cloneNode(true);
    const adTitle = ad.querySelector('.popup__title');
    const adTextAdress = ad.querySelector('.popup__text--address');
    const adTextPrice = ad.querySelector('.popup__text--price');
    const adType = ad.querySelector('.popup__type');
    const adTextCapacity = ad.querySelector('.popup__text--capacity');
    const adTextTime = ad.querySelector('.popup__text--time');
    const adDescr = ad.querySelector('.popup__description');
    const adAvatar = ad.querySelector('.popup__avatar');

    const isEmpty = (selector, property) => {
      if(property === undefined) {
        selector.classList.add('hidden');
      } else {
        selector.classList.remove('hidden');
        selector.textContent = property;
      }
    };

    isEmpty(adTitle, index.offer.title);
    isEmpty(adTextAdress, index.offer.address);
    isEmpty(adTextPrice, index.offer.price);
    adTextPrice.insertAdjacentHTML('beforeend', '<span>₽/ночь</span>');

    if(index.offer.type === undefined) {
      adType.classList.add('hidden');
    } else {
      adType.classList.remove('hidden');
    }

    switch(index.offer.type) {
      case 'flat':
        adType.textContent = 'Квартира';
        break;
      case 'bungalow':
        adType.textContent = 'Бунгало';
        break;
      case 'house':
        adType.textContent = 'Дом';
        break;
      case 'palace':
        adType.textContent = 'Дворец';
        break;
      case 'hotel':
        adType.textContent = 'Отель';
        break;
    }

    if(index.offer.rooms === undefined || index.offer.guests === undefined) {
      adTextCapacity.classList.add('hidden');
    } else {
      adTextCapacity.classList.remove('hidden');
    }

    if(index.offer.checkin === undefined || index.offer.checkout === undefined) {
      adTextTime.classList.add('hidden');
    } else {
      adTextTime.classList.remove('hidden');
    }

    adTextCapacity.textContent = `${index.offer.rooms} комнаты для ${index.offer.guests} гостей`;
    adTextTime.textContent = `Заезд после ${index.offer.checkin}, выезд до ${index.offer.checkout}`;
    const modifiers = index.offer.features.map((feature) => `popup__feature--${feature}`);
    ad.querySelectorAll('.popup__feature').forEach((el) => {
      const modifier = el.classList[1];
      if(!modifiers.includes(modifier)) {
        el.remove();
      } else {
        ad.querySelector('.popup__features').classList.add('hidden');
      }
    });

    isEmpty(adDescr, index.offer.description);
    const adPhotosList = ad.querySelector('.popup__photos');
    const photosFragment = document.createDocumentFragment();

    if(index.offer.photos.children === undefined) {
      adPhotosList.classList.add('hidden');
    } else {
      adPhotosList.classList.remove('hidden');
    }

    index.offer.photos.forEach((el) => {
      adPhotosList.textContent = '';
      const adPhoto = document.createElement('img');
      adPhoto.src = el;
      adPhoto.classList.add('popup__photo');
      adPhoto.width = '45';
      adPhoto.height = '40';
      adPhoto.alt = 'Фотография жилья';
      photosFragment.appendChild(adPhoto);
    });

    if(index.author.avatar === undefined) {
      adAvatar.classList.add('hidden');
    } else {
      adAvatar.src = index.author.avatar;
    }

    adPhotosList.appendChild(photosFragment);
    fragment.appendChild(ad);
  }

  mapCanvas.appendChild(fragment);

  return mapCanvas;
};

export {similarAds};
