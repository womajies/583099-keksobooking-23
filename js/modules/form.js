import {disabledCapacity, whichCapacity, whichType} from '../utils/which-selects.js';
import {mergeCollectionIntoOne} from '../utils/merge-collection-into-one.js';


const validateForm = () => {
  const adForm = document.querySelector('.ad-form');
  const adFormRoom = adForm.querySelector('#room_number');
  const adFormCapacity = adForm.querySelector('#capacity');
  const adFormType = adForm.querySelector('#type');
  const adFormPrice = adForm.querySelector('#price');

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

const disabledForm = () => {
  const adForm = document.querySelector('.ad-form');
  const adFormFields = adForm.querySelectorAll('fieldset');
  const mapFilter = document.querySelector('.map__filters');
  const mapFilterSelects = mapFilter.querySelectorAll('.map__filter');
  const mapFilterCheckbox = mapFilter.querySelectorAll('.map__checkbox');

  adForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('ad-form--disabled');
  adFormFields.forEach((el) => {
    el.disabled = true;
  });

  const mapFilters = mergeCollectionIntoOne(mapFilterSelects, mapFilterCheckbox);
  mapFilters.forEach((el) => {
    el.disabled = true;
  });
};

const enabledForm = () => {
  const adForm = document.querySelector('.ad-form');
  const adFormFields = adForm.querySelectorAll('fieldset');
  const mapFilter = document.querySelector('.map__filters');
  const mapFilterSelects = mapFilter.querySelectorAll('.map__filter');
  const mapFilterCheckbox = mapFilter.querySelectorAll('.map__checkbox');

  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('ad-form--disabled');
  adFormFields.forEach((el) => {
    el.disabled = false;
  });

  const mapFilters = mergeCollectionIntoOne(mapFilterSelects, mapFilterCheckbox);
  mapFilters.forEach((el) => {
    el.disabled = false;
  });
};

export {validateForm, disabledForm, enabledForm};
