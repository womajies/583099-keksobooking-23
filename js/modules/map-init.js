import {createAdElement} from './similar-ads.js';
import {enabledForm, setAdFormSubmit} from '../modules/form.js';
import {getData} from '../modules/api.js';
import {debounce} from '../utils/debounce.js';
import {showSuccessMsg} from '../utils/success-msg.js';
import {showAlert} from '../utils/show-alert.js';

const mapInit = () => {
  const resetButton = document.querySelector('.ad-form__reset');
  const resetForm = document.querySelector('.ad-form');
  const mapFilter = document.querySelector('.map__filters');
  const address = document.querySelector('#address');
  const housingType = mapFilter.querySelector('#housing-type');
  const housingPrice = mapFilter.querySelector('#housing-price');
  const housingRooms = mapFilter.querySelector('#housing-rooms');
  const housingGuests = mapFilter.querySelector('#housing-guests');
  const wifiInput = document.querySelector('[value="wifi"]');
  const dishwasherInput = document.querySelector('[value="dishwasher"]');
  const parkingInput = document.querySelector('[value="parking"]');
  const washerInput = document.querySelector('[value="washer"]');
  const elevatorInput = document.querySelector('[value="elevator"]');
  const conditionerInput = document.querySelector('[value="conditioner"]');

  const map = L
    .map('map-canvas')
    .setView({
      lat: 35.68950,
      lng: 139.69200,
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
      lat: 35.68950,
      lng: 139.69200,
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

  resetButton.addEventListener('click', () => {
    mainPinMarker.setLatLng({
      lat: 35.68950,
      lng: 139.69200,
    });

    map.setView({
      lat: 35.68950,
      lng: 139.69200,
    }, 14);

    resetForm.reset();
    mapFilter.reset();
  });

  resetForm.addEventListener('submit', () => {
    mainPinMarker.setLatLng({
      lat: 35.68950,
      lng: 139.69200,
    });

    map.setView({
      lat: 35.68950,
      lng: 139.69200,
    }, 14);
  });

  const markerGroup = L.layerGroup().addTo(map);

  const icon = L.icon({
    iconUrl: '../../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  // let markers = [];

  const renderPins = (array) => {
    // markers.forEach((marker) => {
    //   marker.removeFrom(map);
    // });

    // markers = [];
    markerGroup.clearLayers();

    const slicedArray = array.slice(0, 10);
    slicedArray.forEach((elem) => {
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

      // markers.push(newMarker);
    });
  };

  let advertisments = [];

  getData((objects) => {
    advertisments = objects;
    renderPins(advertisments);
    enabledForm();
  },
  () => {
    showAlert('Не удалось получить данные. Попробуйте позже');
  });

  map.on('load', () => {
    renderPins(advertisments);
    setAdFormSubmit(showSuccessMsg);
    address.value = 'x: 35.68950, y: 139.69200';
  });

  const filterByFeature = (feature, data) => data.filter((adv) => !!(adv.offer.features && adv.offer.features.includes(feature)));

  const renderFilterObjects = () => {
    let filterObjects = advertisments;

    filterObjects = filterObjects.filter((adv) => adv.offer.type === housingType.value || housingType.value === 'any');

    if (housingPrice.value === 'low') {
      filterObjects = filterObjects.filter((adv) =>  adv.offer.price <= 10000);
    }

    if (housingPrice.value === 'middle') {
      filterObjects = filterObjects.filter((adv) =>  adv.offer.price >= 10000 && adv.offer.price <= 50000);
    }

    if (housingPrice.value === 'high') {
      filterObjects = filterObjects.filter((adv) =>  adv.offer.price >= 50000 );
    }

    if (housingRooms.value === '1' || housingGuests.value === '1') {
      filterObjects = filterObjects.filter((adv) =>  adv.offer.rooms === 1);
    }

    if (housingRooms.value === '2' || housingGuests.value === '2') {
      filterObjects = filterObjects.filter((adv) =>  adv.offer.rooms === 2);
    }

    if (housingRooms.value === '3' || housingGuests.value === '3') {
      filterObjects = filterObjects.filter((adv) =>  adv.offer.rooms === 3);
    }

    if (wifiInput.checked) {
      filterObjects = filterByFeature('wifi', filterObjects);
    }

    if (dishwasherInput.checked) {
      filterObjects = filterByFeature('dishwasher', filterObjects);
    }

    if (parkingInput.checked) {
      filterObjects = filterByFeature('parking', filterObjects);
    }

    if (washerInput.checked) {
      filterObjects = filterByFeature('washer', filterObjects);
    }

    if (conditionerInput.checked) {
      filterObjects = filterByFeature('conditioner', filterObjects);
    }

    if (elevatorInput.checked) {
      filterObjects = filterByFeature('elevator', filterObjects);
    }

    renderPins(filterObjects);
  };

  const onChange = (input) => {
    input.addEventListener('change', debounce(renderFilterObjects, 500));
  };

  onChange(housingType);
  onChange(housingPrice);
  onChange(housingRooms);
  onChange(housingGuests);
  onChange(wifiInput);
  onChange(dishwasherInput);
  onChange(parkingInput);
  onChange(washerInput);
  onChange(conditionerInput);
  onChange(elevatorInput);
};

export {mapInit};
