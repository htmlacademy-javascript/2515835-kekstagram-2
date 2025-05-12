import { generatePhotos } from './photos.js';

// Генерация массива фотографий
const photosArray = generatePhotos();
console.log(photosArray);

import { renderPhotos } from './renderPhoto.js';
import { photosData } from './data.js';
renderPhotos(photosData);
