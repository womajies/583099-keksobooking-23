const adForm = document.querySelector('.ad-form');
const adFormCapacity = adForm.querySelector('#capacity');

const disabledCapacity = (capacity) => {
  for(let i = 0; i <= capacity.length - 1; i++) {
    capacity[i].disabled = true;
  }
};

const whichCapacity = (room, capacity) => {
  switch(room.value) {
    case '1':
      disabledCapacity(adFormCapacity);
      capacity[2].disabled = false;
      capacity[2].selected = 'selected';
      break;
    case '2':
      disabledCapacity(adFormCapacity);
      capacity[1].disabled = false;
      capacity[2].disabled = false;
      capacity[1].selected = 'selected';
      capacity[2].selected = 'selected';
      break;
    case '3':
      disabledCapacity(adFormCapacity);
      capacity[0].disabled = false;
      capacity[1].disabled = false;
      capacity[2].disabled = false;
      capacity[0].selected = 'selected';
      capacity[1].selected = 'selected';
      capacity[2].selected = 'selected';
      break;
    case '100':
      disabledCapacity(adFormCapacity);
      capacity[3].selected = 'selected';
      capacity[3].disabled = false;
      break;
  }
};

const whichType = (type, price) => {
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

export {disabledCapacity, whichCapacity, whichType};
