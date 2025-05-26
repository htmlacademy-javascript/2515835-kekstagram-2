import { renderPhotos } from './renderPhoto.js';
import { openBigPicture } from './bigPicture.js';
// Генерация массива фотографий
import{photosArray} from './photos.js'
renderPhotos(photosArray);
document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    openBigPicture(photosArray[index]);
  });
});


