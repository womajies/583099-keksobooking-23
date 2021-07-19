import {onErrorEscKeydown} from '../utils/is-esc-event.js';

const unshowErrorMsg = () => {
  const errorMsg = document.querySelector('.error');
  const errorBtn = document.querySelector('.error__button');

  document.body.removeChild(errorMsg);
  document.removeEventListener('keydown', onErrorEscKeydown);
  errorBtn.removeEventListener('click', unshowErrorMsg);
  document.querySelector('body').removeEventListener('click', unshowErrorMsg);
  errorMsg.querySelector('.error__message').removeEventListener('click', (e) => {
    e.stopPropagation();
  });
};

const showErrorMsg = () => {
  const errorFragment = document.querySelector('#error').content;
  const error = errorFragment.querySelector('.error');
  const errorMsg = error.cloneNode(true);
  const errorBtn = errorMsg.querySelector('.error__button');

  document.body.insertBefore(errorMsg, document.body.lastChild);
  document.addEventListener('keydown', onErrorEscKeydown);
  errorBtn.addEventListener('click', unshowErrorMsg);
  document.querySelector('body').addEventListener('click', unshowErrorMsg);
  errorMsg.querySelector('.error__message').addEventListener('click', (e) => {
    e.stopPropagation();
  });
};


export {showErrorMsg, unshowErrorMsg};
