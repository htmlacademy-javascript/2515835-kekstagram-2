import { renderPhotos } from './renderPhoto.js';
import { openBigPicture } from './bigPicture.js';
import { fetchPhotos, sendFormData } from './api.js';

const form = document.querySelector('.img-filters__form');


const showMessage = (templateId) => {
  const template = document.querySelector(`#${templateId}`);
  if (!template) return;
  const clone = template.content.cloneNode(true);
  document.body.appendChild(clone);

  setTimeout(() => {
    const msg = document.querySelector(`.${templateId}`) || document.querySelector(`section.${templateId}`);
    if (msg) msg.remove();
  }, 5000);
};

fetchPhotos()
  .then((arr) => {
    console.log(arr);
    renderPhotos(arr);

    document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        openBigPicture(arr[index]);
      });
    });
  })
  .catch(() => {
    showMessage('data-error');
  });

if (form) {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(form);

    sendFormData(formData)
      .then(() => {
        showMessage('success');
        form.reset();
      })
      .catch(() => {
        showMessage('error');
      });
  });
}




import { formModule } from './formModule.js';
const formData = {
  hashtags: '',
  comment: 'Пример комментария',
};

formModule.addValidationRule('hashtags', formModule.rules.required('Хэштеги обязательны'));
formModule.addValidationRule('comment', formModule.rules.required('Комментарий обязателен'));


const errors = formModule.validate(formData);
console.log(errors);
