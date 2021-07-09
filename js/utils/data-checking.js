
const dataChecking = (obj) => {
  const templateFragment = document.querySelector('#card').content;
  const template = templateFragment.querySelector('.popup');
  const ad = template.cloneNode(true);
  const adTextTime = ad.querySelector('.popup__text--time');
  const adType = ad.querySelector('.popup__type');
  const adAvatar = ad.querySelector('.popup__avatar');
  const adTextCapacity = ad.querySelector('.popup__text--capacity');

  if(obj.offer.type === undefined) {
    adType.classList.add('hidden');
  } else {
    adType.classList.remove('hidden');
  }

  if(obj.offer.rooms === undefined || obj.offer.guests === undefined) {
    adTextCapacity.classList.add('hidden');
  } else {
    adTextCapacity.classList.remove('hidden');
  }

  if(obj.offer.checkin === undefined || obj.offer.checkout === undefined) {
    adTextTime.classList.add('hidden');
  } else {
    adTextTime.classList.remove('hidden');
  }

  if(ad.querySelectorAll('.popup__feature').length === 0) {
    ad.querySelector('.popup__features').classList.add('hidden');
  } else {
    ad.querySelector('.popup__features').classList.remove('hidden');
  }

  if(obj.author.avatar === undefined) {
    adAvatar.classList.add('hidden');
  } else {
    adAvatar.src = obj.author.avatar;
  }
};

export {dataChecking};
