import { generatePhotos } from './photos.js';
import { renderPhotos } from './renderPhoto.js';
import { openBigPicture } from './bigPicture.js';
// Генерация массива фотографий
const photosArray = generatePhotos();
console.log(photosArray);

renderPhotos(photosArray);
document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    openBigPicture(photosArray[index]);
  });
});

