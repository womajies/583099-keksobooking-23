import {createObjects} from './create-object.js';

const similarAds = () => {
  const mapCanvas = document.querySelector('#map-canvas');
  const templateFragment = document.querySelector('#card').content;
  const template = templateFragment.querySelector('.popup');

  const createAdCardElement = (card) => {
    const adCard = card.cloneNode(true);
    return adCard;
  };

  const createAdCardFragment = (cards) => {
    const ad = createAdCardElement(template);
    const fragment = document.createDocumentFragment();

    cards.forEach((evt) => {
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

      isEmpty(adTitle, evt.offer.title);
      isEmpty(adTextAdress, evt.offer.address);
      isEmpty(adTextPrice, evt.offer.price);
      adTextPrice.insertAdjacentHTML('beforeend', '<span>₽/ночь</span>');

      if(evt.offer.type === undefined) {
        adType.classList.add('hidden');
      } else {
        adType.classList.remove('hidden');
      }

      switch(evt.offer.type) {
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

      if(evt.offer.rooms === undefined || evt.offer.guests === undefined) {
        adTextCapacity.classList.add('hidden');
      } else {
        adTextCapacity.classList.remove('hidden');
      }

      if(evt.offer.checkin === undefined || evt.offer.checkout === undefined) {
        adTextTime.classList.add('hidden');
      } else {
        adTextTime.classList.remove('hidden');
      }

      adTextCapacity.textContent = `${evt.offer.rooms} комнаты для ${evt.offer.guests} гостей`;
      adTextTime.textContent = `Заезд после ${evt.offer.checkin}, выезд до ${evt.offer.checkout}`;
      const modifiers = evt.offer.features.map((feature) => `popup__feature--${feature}`);
      ad.querySelectorAll('.popup__feature').forEach((el) => {
        const modifier = el.classList[1];
        if(!modifiers.includes(modifier)) {
          el.remove();
        } else {
          ad.querySelector('.popup__features').classList.add('hidden');
        }
      });

      isEmpty(adDescr, evt.offer.description);
      const adPhotosList = ad.querySelector('.popup__photos');
      const photosFragment = document.createDocumentFragment();

      if(evt.offer.photos.children === undefined) {
        adPhotosList.classList.add('hidden');
      } else {
        adPhotosList.classList.remove('hidden');
      }

      evt.offer.photos.forEach((el) => {
        adPhotosList.textContent = '';
        const adPhoto = document.createElement('img');
        adPhoto.src = el;
        adPhoto.classList.add('popup__photo');
        adPhoto.width = '45';
        adPhoto.height = '40';
        adPhoto.alt = 'Фотография жилья';
        photosFragment.appendChild(adPhoto);
      });

      if(evt.author.avatar === undefined) {
        adAvatar.classList.add('hidden');
      } else {
        adAvatar.src = evt.author.avatar;
      }

      adPhotosList.appendChild(photosFragment);
      fragment.appendChild(ad);
    });

    return fragment;
  };

  const resultCreateAdCardFragment = createAdCardFragment(createObjects());

  mapCanvas.appendChild(resultCreateAdCardFragment);
  console.log(mapCanvas);
  return mapCanvas;
};

export {similarAds};
