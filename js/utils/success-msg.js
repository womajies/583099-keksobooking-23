import {onSuccessEscKeydown} from '../utils/is-esc-event.js';
import {whichType} from '../utils/which-selects.js';

const unshowSuccessMsg = () => {
  const successMsg = document.querySelector('.success');

  document.body.removeChild(successMsg);
  document.removeEventListener('keydown', onSuccessEscKeydown);
  document.querySelector('body').removeEventListener('click', unshowSuccessMsg);
  successMsg.querySelector('.success__message').removeEventListener('click', (e) => {
    e.stopPropagation();
  });
};

const showSuccessMsg = (evt) => {
  const successFragment = document.querySelector('#success').content;
  const success = successFragment.querySelector('.success');
  const successMsg = success.cloneNode(true);
  const mapFilter = document.querySelector('.map__filters');
  const adForm = document.querySelector('.ad-form');
  const adFormType = adForm.querySelector('#type');
  const adFormPrice = adForm.querySelector('#price');

  document.body.insertBefore(successMsg, document.body.lastChild);
  document.addEventListener('keydown', onSuccessEscKeydown);
  document.querySelector('body').addEventListener('click', unshowSuccessMsg);
  document.querySelector('.success__message').addEventListener('click', (e) => {
    e.stopPropagation();
  });
  evt.target.reset();
  whichType(adFormType, adFormPrice);
  mapFilter.reset();
};


export {showSuccessMsg, unshowSuccessMsg};
