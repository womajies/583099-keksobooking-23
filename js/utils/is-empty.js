
const isEmpty = (selector, property) => {
  if(property === undefined) {
    selector.classList.add('hidden');
  } else {
    selector.classList.remove('hidden');
    selector.textContent = property;
  }
};

export {isEmpty};
