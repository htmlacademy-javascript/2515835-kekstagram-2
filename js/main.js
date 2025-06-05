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

import { formModule } from './formModule.js';
const formData = {
  hashtags: '',
  comment: 'Пример комментария',
};

formModule.addValidationRule('hashtags', formModule.rules.required('Хэштеги обязательны'));
formModule.addValidationRule('comment', formModule.rules.required('Комментарий обязателен'));


const errors = formModule.validate(formData);
console.log(errors);
