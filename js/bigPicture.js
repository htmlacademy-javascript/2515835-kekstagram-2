const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureImage = bigPictureContainer.querySelector('.big-picture__img img');
const likesCountElement = bigPictureContainer.querySelector('.likes-count');
const commentsCountElement = bigPictureContainer.querySelector('.social__comment-shown-count');
const totalCommentsCountElement = bigPictureContainer.querySelector('.social__comment-total-count');
const commentsList = bigPictureContainer.querySelector('.social__comments');
const captionElement = bigPictureContainer.querySelector('.social__caption');
const closeButton = bigPictureContainer.querySelector('.big-picture__cancel');
const commentCountBlock = bigPictureContainer.querySelector('.social__comment-count');
const loadMoreCommentsButton = bigPictureContainer.querySelector('.comments-loader');

let escKeyHandler;

export const openBigPicture = (photoData) => {
  bigPictureImage.src = photoData.url;
  bigPictureImage.alt = photoData.description;

  likesCountElement.textContent = photoData.likes;

  commentsCountElement.textContent = photoData.comments.length;
  totalCommentsCountElement.textContent = photoData.comments.length;

  commentsList.innerHTML = '';

  photoData.comments.forEach((comment) => {
    const commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');

    commentItem.innerHTML = `
      <img
        class="social__picture"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    commentsList.appendChild(commentItem);
  });

  captionElement.textContent = photoData.description;
  bigPictureContainer.classList.remove('hidden');

  commentCountBlock.classList.add('hidden');
  loadMoreCommentsButton.classList.add('hidden');

  document.body.classList.add('modal-open');

  escKeyHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      closeBigPicture();
    }
  };
  document.addEventListener('keydown', escKeyHandler);

  closeButton.addEventListener('click', closeBigPicture);
};

const closeBigPicture = () => {
  document.removeEventListener('keydown', escKeyHandler);

  bigPictureContainer.classList.add('hidden');

  document.body.classList.remove('modal-open');
};
