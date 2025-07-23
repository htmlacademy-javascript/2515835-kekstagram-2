import { openBigPicture } from './bigPicture.js';
import { fetchPhotos, sendFormData } from './api.js';
import { formModule } from './formModule.js';
import { debounce } from './utils.js';
import { renderPhotos,} from './renderPhoto.js';

const showMessage = (templateId) => {
  const template = document.querySelector(`#${templateId}`);
  if (!template) {
    return;
  }
  const clone = template.content.cloneNode(true);
  document.body.appendChild(clone);

  setTimeout(() => {
    const msg = document.querySelector(`.${templateId}`) || document.querySelector(`section.${templateId}`);
    if (msg) {
      msg.remove();
    }
  }, 5000);
};

const form = document.querySelector('.img-filters__form');

fetchPhotos()
  .then((arr) => {
    const allPhotos = [...arr];
   console.log(allPhotos)

    renderPhotos(arr);


    document.querySelectorAll('.picture').forEach((thumb, index) => {
      thumb.addEventListener('click', (evt) => {
        openBigPicture(arr[index]);
        console.log(arr[index])
      });
    });


    const filtersContainer = document.querySelector('.img-filters');
    if (filtersContainer) {

      const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };

      const getRandomPhotos = (photos, count) => {
        const shuffled = [...photos];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = getRandomInt(0,i);
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0,count);
      };

      const clearPhotos = () => {
        document.querySelector('.picture').remove();
      };

      const applyFilter = (filterId) => {
        let filteredPhotos = [];
        switch(filterId){
          case 'filter-default':
            filteredPhotos = [...allPhotos];
            break;
          case 'filter-random':
            filteredPhotos = getRandomPhotos(allPhotos,10);
            break;
          case 'filter-discussed':
            filteredPhotos = [...allPhotos].sort((a,b)=>b.comments.length - a.comments.length);
            break;
          default:
            filteredPhotos = [...allPhotos];
        }
        clearPhotos();
        renderPhotos(filteredPhotos);
      };

      form.addEventListener('click', debounce((evt)=>{
        if(evt.target.tagName !== 'BUTTON') {
          return;
        }


        form.querySelectorAll('button').forEach((btn)=>btn.classList.remove('img-filters__button--active'));
        evt.target.classList.add('img-filters__button--active');

        const filterId = evt.target.id;
        applyFilter(filterId);

      },500));
    }
      const uploadForm = document.querySelector('.img-upload__form')
      console.log(uploadForm)

      uploadForm.addEventListener('submit', (evt)=>{
        evt.preventDefault();
        const formData = new FormData(uploadForm);
        sendFormData(formData)
          .then(()=>{
            showMessage('success');
            uploadForm.reset();
          })
          .catch(()=>{
            showMessage('error');
          });
      });


    const formValidationData = {
      hashtags:'',
      comment:'Пример комментария',
    };

    formModule.addValidationRule('hashtags', formModule.rules.required('Хэштеги обязательны'));
    formModule.addValidationRule('comment', formModule.rules.required('Комментарий обязателен'));

    const errors = formModule.validate(formValidationData);
    // eslint-disable-next-line no-console
    console.log(errors);

  })
  .catch(() => {
    showMessage('data-error');
  });
