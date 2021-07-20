import {onSuccessEscKeydown} from '../utils/is-esc-event.js';

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

  document.body.insertBefore(successMsg, document.body.lastChild);
  document.addEventListener('keydown', onSuccessEscKeydown);
  document.querySelector('body').addEventListener('click', unshowSuccessMsg);
  document.querySelector('.success__message').addEventListener('click', (e) => {
    e.stopPropagation();
  });
  evt.target.reset();
  mapFilter.reset();
};


export {showSuccessMsg, unshowSuccessMsg};
