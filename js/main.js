import { openBigPicture } from './bigPicture.js';
import { fetchPhotos } from './api.js';
import { formModule } from './formModule.js';
import { debounce } from './utils.js';
import { renderPhotos,} from './renderPhoto.js';
import'./form-validation.js';
import { showMessage } from './form-validation.js'


const form = document.querySelector('.img-filters__form');

fetchPhotos()
  .then((arr) => {
    const allPhotos = [...arr];
   console.log(allPhotos)

    renderPhotos(arr);


    document.querySelectorAll('.picture').forEach((thumb, index) => {
      thumb.addEventListener('click', (evt) => {
        openBigPicture(arr[index]);
      });
    });


    const filtersContainer = document.querySelector('.img-filters');
    if (filtersContainer) {
      filtersContainer.classList.remove('hidden');
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
        const pictures = document.querySelectorAll('.picture');
        pictures.forEach(picture => picture.remove());
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

      const debouncedApplyFilter = debounce(applyFilter, 500);

      form.addEventListener('click', (evt)=>{
        if(evt.target.tagName !== 'BUTTON') {
          return;
        }


        form.querySelectorAll('button').forEach((btn) => btn.classList.remove('img-filters__button--active'));
        evt.target.classList.add('img-filters__button--active');

        const filterId = evt.target.id;
        debouncedApplyFilter(filterId);

      });
    }

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
