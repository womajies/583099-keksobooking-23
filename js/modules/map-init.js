import {createObjects} from './create-object.js';
import {createAdElement} from './similar-ads.js';
import {enabledForm} from '../modules/form.js';

const mapInit = () => {
  const resetButton = document.querySelector('.ad-form__reset');
  const adress = document.querySelector('#address');
  const objects = createObjects();
  const map = L.map('map-canvas');


  map.on('load', () => {
    enabledForm();
    adress.value = 'x: 35.68950, y: 139.69200';
  });

  map.setView({
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
    adress.value = `x: ${coordinates.lat.toFixed(5)}, y: ${coordinates.lng.toFixed(5)}`;
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
  });

  const markerGroup = L.layerGroup().addTo(map);

  const icon = L.icon({
    iconUrl: '../../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  objects.forEach((el) => {
    const marker = L.marker({
      lat: el.location.lat,
      lng: el.location.lng,
    },
    {
      icon,
    },
    );

    marker
      .addTo(markerGroup)
      .bindPopup(createAdElement(el),
        {
          keepInView: true,
        },
      );
  });

};

export {mapInit};
