const createPhotoElement = (photo) => {
  const template = document.querySelector('#picture').content.querySelector('.picture');
  const photoElement = template.cloneNode(true);

  const img = photoElement.querySelector('.picture__img');
  const commentsSpan = photoElement.querySelector('.picture__comments');
  const likesSpan = photoElement.querySelector('.picture__likes');

  img.src = photo.url;
  img.alt = photo.description;

  commentsSpan.textContent = `Комментарии: ${photo.comments.length}`;
  likesSpan.textContent = `Лайки: ${photo.likes}`;

  return photoElement;
};

const renderPhotos = (photos) => {
  const container = document.querySelector('.pictures');

  container.innerHTML = '';

  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const element = createPhotoElement(photo);
    fragment.appendChild(element);
  });

  container.appendChild(fragment);
};

export { renderPhotos };

import { openBigPicture } from './bigPicture.js';

const containerPhotos = document.querySelector('.pictures');

const addThumbnailClickListeners = () => {
   containerPhotos.addEventListener('click', (evt) => {
     const thumbnail = evt.target.closest('.picture');
     if (!thumbnail) return;

     const index = Array.from(containerPhotos.children).indexOf(thumbnail);
     const photoData = photosArray[index];

     openBigPicture(photoData);
   });
};

addThumbnailClickListeners();

containerPhotos.addEventListener('click', (evt) => {
  const thumbnail = evt.target.closest('.big-picture');
  if (!thumbnail) return;

  const index = parseInt(thumbnail.dataset.index,10);
  if (isNaN(index)) return;

  const photoData = photosArray[index];
  openBigPicture(photoData);
});
