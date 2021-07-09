const dataSwitching = (obj) => {
  const templateFragment = document.querySelector('#card').content;
  const template = templateFragment.querySelector('.popup');
  const ad = template.cloneNode(true);
  const adType = ad.querySelector('.popup__type');

  switch(obj.offer.type) {
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
};

export {dataSwitching};
