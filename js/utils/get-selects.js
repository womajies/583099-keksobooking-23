const adForm = document.querySelector('.ad-form');
const adFormCapacity = adForm.querySelector('#capacity');

const disabledCapacity = (capacity) => {
  Array.from(capacity.children).forEach((element) => {
    element.disabled = true;
  });
};

const getCapacity = (room, capacity) => {
  switch(room.value) {
    case '1':
      disabledCapacity(adFormCapacity);
      capacity[2].disabled = false;
      capacity[3].removeAttribute('selected');
      capacity[2].setAttribute('selected', '');
      break;
    case '2':
      disabledCapacity(adFormCapacity);
      capacity[1].disabled = false;
      capacity[2].disabled = false;
      capacity[3].removeAttribute('selected');
      capacity[2].setAttribute('selected', '');
      break;
    case '3':
      disabledCapacity(adFormCapacity);
      capacity[0].disabled = false;
      capacity[1].disabled = false;
      capacity[2].disabled = false;
      capacity[3].removeAttribute('selected');
      capacity[2].setAttribute('selected', '');
      break;
    case '100':
      disabledCapacity(adFormCapacity);
      capacity[2].disabled = true;
      capacity[3].disabled = false;
      capacity[2].removeAttribute('selected');
      capacity[3].setAttribute('selected', '');
      break;
  }
};

const getType = (type, price) => {
  switch(type.value) {
    case 'bungalow':
      price.min = 0;
      price.placeholder = 0;
      break;
    case 'flat':
      price.min = 1000;
      price.placeholder = 1000;
      break;
    case 'hotel':
      price.min = 3000;
      price.placeholder = 3000;
      break;
    case 'house':
      price.min = 5000;
      price.placeholder = 5000;
      break;
    case 'palace':
      price.min = 10000;
      price.placeholder = 10000;
      break;
  }
};

export {disabledCapacity, getCapacity, getType};
