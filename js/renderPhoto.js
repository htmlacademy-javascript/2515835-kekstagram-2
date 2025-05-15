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
