import {getRandomFractionalNumber} from './utils/get-random-fractional-number.js';
import {getRandomIntegerNumber} from './utils/get-random-integer-number.js';
import {createObjects} from './modules/create-object.js';
import {similarAds} from './modules/similar-ads.js';

getRandomIntegerNumber(10, 1);
getRandomFractionalNumber(10, 1, 5);
createObjects();
similarAds();
