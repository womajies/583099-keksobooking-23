import {createAdElement} from './similar-ads.js';
import {enabledForm, enabledFilter, setAdFormSubmit} from '../modules/form.js';
import {getData} from '../modules/api.js';
import {filterType, filterPrice, filterRooms, filterGuests, filterFeatures, mapFilterChangeHandler} from '../modules/filter-map.js';
// import {getType} from '../utils/get-selects.js';
import {formSuccessMsg} from '../utils/success-msg.js';
import {showAlert} from '../utils/show-alert.js';

const mapInit = () => {
  const VIEW_SCALE = 14;
  const SIMILAR_AD_COUNT = 10;
  const DEFAULT_ADRESS_VALUE = 'x: 35.68171, y: 139.75389';
  // const DEFAULT_COORDINATES = {
  //   lat: 35.68171,
  //   lng: 139.75389,
  // };

  const resetButton = document.querySelector('.ad-form__reset');
  const resetForm = document.querySelector('.ad-form');
  const mapFilter = document.querySelector('.map__filters');
  const address = document.querySelector('#address');
  // const adFormPrice = document.querySelector('#price');
  // const adFormType = document.querySelector('#type');

  const map = L
    .map('map-canvas')
    .on('load', () => {
      address.value = DEFAULT_ADRESS_VALUE;
      enabledForm();
      setAdFormSubmit(formSuccessMsg);
    })
    .setView({
      lat: 35.68171,
      lng: 139.75389,
    }, VIEW_SCALE);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
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
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const removeLayers = () => markerGroup.clearLayers();

  const renderPins = (array) => {
    array.forEach((element) => {
      const lat = element.location.lat;
      const lng = element.location.lng;
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
        .bindPopup(createAdElement(element));
    });
  };

  let advertisments = [];

  const createPins = () => {
    getData((objects) => {
      advertisments = objects;
      renderPins(advertisments.slice(0, SIMILAR_AD_COUNT));
      enabledFilter();
      mapFilterChangeHandler(() => {
        removeLayers();
        renderPins(advertisments
          .slice()
          .filter((ad) => (filterType(ad) && filterRooms(ad) && filterGuests(ad) && filterPrice(ad) && filterFeatures(ad)))
          .slice(0, SIMILAR_AD_COUNT));
      });
    },
    () => {
      showAlert('Не удалось получить данные. Попробуйте позже');
    });
  };
  createPins();

  resetButton.addEventListener('click', () => {
    mainPinMarker.setLatLng({
      lat: 35.68171,
      lng: 139.75389,
    });

    map.setView({
      lat: 35.68171,
      lng: 139.75389,
    }, VIEW_SCALE);

    resetForm.reset();
    mapFilter.reset();
    createPins();
    map.closePopup();
  });

  resetForm.addEventListener('submit', () => {
    mainPinMarker.setLatLng({
      lat: 35.68171,
      lng: 139.75389,
    });

    map.setView({
      lat: 35.68171,
      lng: 139.75389,
    }, VIEW_SCALE);

    createPins();
    map.closePopup();
  });
};

export {mapInit};
