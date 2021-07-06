import {disabledCapacity, whichCapacity} from '../utils/which-capacity.js';

const adForm = document.querySelector('.ad-form');
const adFormRoom = adForm.querySelector('#room_number');
const adFormCapacity = adForm.querySelector('#capacity');

const validateForm = () => {
  disabledCapacity(adFormCapacity);
  adFormCapacity[2].disabled = false;

  adForm.addEventListener(('change'), (evt) => {
    if(evt.target.matches('#room_number')) {
      whichCapacity(adFormRoom, adFormCapacity);
    }
  });
};

export {validateForm};
