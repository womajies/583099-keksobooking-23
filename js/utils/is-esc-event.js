import {unshowErrorMsg} from '../utils/error-msg.js';
import {unshowSuccessMsg} from '../utils/success-msg.js';

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const onSuccessEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    unshowSuccessMsg();
  }
};

const onErrorEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    unshowErrorMsg();
  }
};

export {onSuccessEscKeydown, onErrorEscKeydown};
