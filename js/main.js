import {createObject, createObjects} from './modules/create-object.js';
import {createAdElement, createAdsFragment} from './modules/similar-ads.js';

const mapCanvas = document.querySelector('#map-canvas');
const object = createObject();
const objects = createObjects();
const ad = createAdElement(object);
const adsFragment = createAdsFragment(objects);

mapCanvas.appendChild(ad);
mapCanvas.appendChild(adsFragment);
