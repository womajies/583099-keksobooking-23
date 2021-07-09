import {disabledCapacity, whichCapacity, whichType} from '../utils/which-selects.js';

const adForm = document.querySelector('.ad-form');
const adFormRoom = adForm.querySelector('#room_number');
const adFormCapacity = adForm.querySelector('#capacity');
const adFormType = adForm.querySelector('#type');
const adFormPrice = adForm.querySelector('#price');

const validateForm = () => {
  disabledCapacity(adFormCapacity);
  adFormCapacity[2].disabled = false;

  adForm.addEventListener(('change'), (evt) => {
    if(evt.target.matches('#room_number')) {
      whichCapacity(adFormRoom, adFormCapacity);
    }
    if(evt.target.matches('#type')) {
      whichType(adFormType, adFormPrice);
    }
  });
};

export {validateForm};
