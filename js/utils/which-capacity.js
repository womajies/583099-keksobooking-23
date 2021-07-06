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

export {disabledCapacity, whichCapacity};
