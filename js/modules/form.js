import {disabledCapacity, getCapacity, getType} from '../utils/get-selects.js';
import {sendData} from '../modules/api.js';
import {formErrorMsg} from '../utils/error-msg.js';

const validateForm = () => {
  const adForm = document.querySelector('.ad-form');
  const adFormRoom = adForm.querySelector('#room_number');
  const adFormCapacity = adForm.querySelector('#capacity');
  const adFormType = adForm.querySelector('#type');
  const adFormPrice = adForm.querySelector('#price');
  const adFormTimein = adForm.querySelector('#timein');
  const adFormTimeout = adForm.querySelector('#timeout');

  disabledCapacity(adFormCapacity);
  adFormCapacity[2].disabled = false;

  adFormRoom.addEventListener(('change'), () => {
    getCapacity(adFormRoom, adFormCapacity);
  });
  adFormType.addEventListener(('change'), () => {
    getType(adFormType, adFormPrice);
  });
  adFormTimein.addEventListener(('change'), () => {
    adFormTimeout.value = adFormTimein.value;
  });
  adFormTimeout.addEventListener(('change'), () => {
    adFormTimein.value = adFormTimeout.value;
  });
};

const disabledSelects = (array) => {
  array.forEach((item) => {
    item.disabled = true;
  });
};

const enabledSelects = (array) => {
  array.forEach((item) => {
    item.disabled = false;
  });
};

const disabledForm = () => {
  const adForm = document.querySelector('.ad-form');
  const adFormFields = adForm.querySelectorAll('fieldset');

  adForm.classList.add('ad-form--disabled');
  disabledSelects(adFormFields);
};

const disabledFilter = () => {
  const mapFilter = document.querySelector('.map__filters');
  const mapFilterElems = mapFilter.querySelectorAll('.map__filter, .map__checkbox');

  mapFilter.classList.add('map__filters--disabled');
  disabledSelects(mapFilterElems);
};

const enabledForm = () => {
  const adForm = document.querySelector('.ad-form');
  const adFormFields = adForm.querySelectorAll('fieldset');

  adForm.classList.remove('ad-form--disabled');
  enabledSelects(adFormFields);
};

const enabledFilter = () => {
  const mapFilter = document.querySelector('.map__filters');
  const mapFilterElems = mapFilter.querySelectorAll('.map__filter, .map__checkbox');

  mapFilter.classList.remove('map__filters--disabled');
  enabledSelects(mapFilterElems);
};

const setAdFormSubmit = (onSuccess) => {
  const adForm = document.querySelector('.ad-form');

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(evt),
      () => formErrorMsg(),
      new FormData(evt.target),
    );

  });
};

export {validateForm, disabledForm, disabledFilter, enabledForm, enabledFilter, setAdFormSubmit};
