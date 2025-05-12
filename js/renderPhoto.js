const createPhotoElement = (photo) => {
  const template = document.querySelector('#picture').content.querySelector('.picture');
  const photoElement = template.cloneNode(true);

  const img = photoElement.querySelector('.picture__img');
  img.src = photo.url;
  img.alt = photo.description;

  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments;

  return photoElement;
};

const renderPhotos = (photos) => {
  const picturesContainer = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoElement = createPhotoElement(photo);
    fragment.appendChild(photoElement);
  });

  picturesContainer.appendChild(fragment);
};

export { renderPhotos };
