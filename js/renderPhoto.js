import { openBigPicture } from './bigPicture.js';

const createPhotoElement = (photo, index) => {
  const template = document.querySelector('#picture').content.querySelector('.picture');
  const photoElement = template.cloneNode(true);
  photoElement.setAttribute('data-index', index);

  const img = photoElement.querySelector('.picture__img');
  const commentsSpan = photoElement.querySelector('.picture__comments');
  const likesSpan = photoElement.querySelector('.picture__likes');

  img.src = photo.url;
  img.alt = photo.description;

  commentsSpan.textContent = `${photo.comments.length}`;
  likesSpan.textContent = `${photo.likes}`;

  return photoElement;
};

const renderPhotos = (photos) => {
  const container = document.querySelector('.pictures');


  const fragment = document.createDocumentFragment();

  photos.forEach((photo, index) => {
    const element = createPhotoElement(photo,index);
    element.addEventListener('click', () => {
      openBigPicture(photo);
    });

    fragment.appendChild(element);
  });

  container.appendChild(fragment);
};

export { renderPhotos };
