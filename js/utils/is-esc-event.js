import {formErrorEscapeMsg} from '../utils/error-msg.js';
import {formSuccessEscapeMsg} from '../utils/success-msg.js';

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const onSuccessEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    formSuccessEscapeMsg();
  }
};

const onErrorEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    formErrorEscapeMsg();
  }
};

export {onSuccessEscKeydown, onErrorEscKeydown};
