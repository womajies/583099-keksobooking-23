import {onSuccessEscKeydown} from '../utils/is-esc-event.js';
import {getType} from './get-selects.js';

const formSuccessEscapeMsg = () => {
  const successMsg = document.querySelector('.success');

  document.body.removeChild(successMsg);
  document.removeEventListener('keydown', onSuccessEscKeydown);
  document.querySelector('body').removeEventListener('click', formSuccessEscapeMsg);
  successMsg.querySelector('.success__message').removeEventListener('click', (e) => {
    e.stopPropagation();
  });
};

const formSuccessMsg = (evt) => {
  const successFragment = document.querySelector('#success').content;
  const success = successFragment.querySelector('.success');
  const successMsg = success.cloneNode(true);
  const mapFilter = document.querySelector('.map__filters');
  const adForm = document.querySelector('.ad-form');
  const adFormType = adForm.querySelector('#type');
  const adFormPrice = adForm.querySelector('#price');

  document.body.insertBefore(successMsg, document.body.lastChild);
  document.addEventListener('keydown', onSuccessEscKeydown);
  document.querySelector('body').addEventListener('click', formSuccessEscapeMsg);
  evt.target.reset();
  mapFilter.reset();
  getType(adFormType, adFormPrice);
};


export {formSuccessMsg, formSuccessEscapeMsg};
