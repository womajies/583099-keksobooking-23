import {createAdElement} from './similar-ads.js';
import {enabledForm, enabledFilter, setAdFormSubmit} from '../modules/form.js';
import {getData} from '../modules/api.js';
import {debounce} from '../utils/debounce.js';
import {showSuccessMsg} from '../utils/success-msg.js';
import {showAlert} from '../utils/show-alert.js';

const mapInit = () => {
  const ANY = 'any';
  const SIMILAR_AD_COUNT = 10;

  const housingPrice = {
    low: {start: 0, end: 10000},
    middle: {start: 10000, end: 50000},
    high: {start: 50000, end: 1000000},
  };
  const resetButton = document.querySelector('.ad-form__reset');
  const resetForm = document.querySelector('.ad-form');
  const mapFilter = document.querySelector('.map__filters');
  const address = document.querySelector('#address');
  const housingTypeSelect = mapFilter.querySelector('#housing-type');
  const housingPriceSelect = mapFilter.querySelector('#housing-price');
  const housingRoomsSelect = mapFilter.querySelector('#housing-rooms');
  const housingGuestsSelect = mapFilter.querySelector('#housing-guests');

  const map = L
    .map('map-canvas')
    .on('load', () => {
      address.value = 'x: 35.68171, y: 139.75389';
      enabledForm();
      setAdFormSubmit(showSuccessMsg);
    })
    .setView({
      lat: 35.68171,
      lng: 139.75389,
    }, 14);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: '../../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(
    {
      lat: 35.68171,
      lng: 139.75389,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();
    address.value = `x: ${coordinates.lat.toFixed(5)}, y: ${coordinates.lng.toFixed(5)}`;
  });

  const markerGroup = L.layerGroup().addTo(map);

  const icon = L.icon({
    iconUrl: '../../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const removeLayer = () => markerGroup.clearLayers();

  const renderPins = (array) => {
    array.forEach((elem) => {
      const lat = elem.location.lat;
      const lng = elem.location.lng;
      const newMarker = L.marker({
        lat: lat,
        lng: lng,
      },
      {
        icon,
        keepInView: true,
      });
      newMarker
        .addTo(markerGroup)
        .bindPopup(createAdElement(elem));
    });
  };

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
      removeLayer();
      cb();
    }, 500));
  };

  let advertisments = [];

  getData((objects) => {
    advertisments = objects;
    renderPins(advertisments.slice(0, SIMILAR_AD_COUNT));
    enabledFilter();
    mapFilterChangeHandler(() => {
      renderPins(advertisments
        .slice()
        .filter((ad) => (filterType(ad) && filterRooms(ad) && filterGuests(ad) && filterPrice(ad) && filterFeatures(ad)))
        .slice(0, SIMILAR_AD_COUNT));
    });
  },
  () => {
    showAlert('Не удалось получить данные. Попробуйте позже');
  });

  resetButton.addEventListener('click', () => {
    mainPinMarker.setLatLng({
      lat: 35.68171,
      lng: 139.75389,
    });

    map.setView({
      lat: 35.68171,
      lng: 139.75389,
    }, 14);

    resetForm.reset();
    mapFilter.reset();
    renderPins(advertisments.slice(0, SIMILAR_AD_COUNT));
  });

  resetForm.addEventListener('submit', () => {
    mainPinMarker.setLatLng({
      lat: 35.68171,
      lng: 139.75389,
    });

    map.setView({
      lat: 35.68171,
      lng: 139.75389,
    }, 14);

    renderPins(advertisments.slice(0, SIMILAR_AD_COUNT));
  });
};

export {mapInit};
