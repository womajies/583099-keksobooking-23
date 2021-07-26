import {debounce} from '../utils/debounce.js';

const ANY = 'any';
const housingPrice = {
  low: {start: 0, end: 10000},
  middle: {start: 10000, end: 50000},
  high: {start: 50000, end: 1000000},
};
const mapFilter = document.querySelector('.map__filters');
const housingTypeSelect = mapFilter.querySelector('#housing-type');
const housingPriceSelect = mapFilter.querySelector('#housing-price');
const housingRoomsSelect = mapFilter.querySelector('#housing-rooms');
const housingGuestsSelect = mapFilter.querySelector('#housing-guests');

const filterType = (ad) => housingTypeSelect.value === ANY || ad.offer.type === housingTypeSelect.value;
const filterPrice = (ad) => housingPriceSelect.value === ANY || (ad.offer.price >= housingPrice[housingPriceSelect.value].start && ad.offer.price <= housingPrice[housingPriceSelect.value].end);
const filterRooms = (ad) => housingRoomsSelect.value === ANY || ad.offer.rooms === Number(housingRoomsSelect.value);
const filterGuests = (ad) => housingGuestsSelect.value === ANY || ad.offer.guests === Number(housingGuestsSelect.value);

const filterFeatures = (ad) => {
  const checkedFeatures = mapFilter.querySelectorAll('input[name="features"]:checked');
  if (ad.offer.features) {
    return Array.from(checkedFeatures).every((feature) => ad.offer.features.includes(feature.value));
  }
};

const mapFilterChangeHandler = (cb) => {
  mapFilter.addEventListener('change', debounce(() => {
    cb();
  }, 500));
};

export {filterType, filterPrice, filterRooms, filterGuests, filterFeatures, mapFilterChangeHandler};
