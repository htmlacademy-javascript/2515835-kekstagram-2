let onLoadMoreComments;
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
let allComments = [];
let commentsShownCount = 0;
const COMMENTS_PER_PAGE = 5;

const closeBigPicture = () => {
  document.removeEventListener('keydown', escKeyHandler);

  if (onLoadMoreComments) {
    loadMoreCommentsButton.removeEventListener('click', onLoadMoreComments);
    onLoadMoreComments = null;
  }

  bigPictureContainer.classList.add('hidden');

  document.body.classList.remove('modal-open');

  closeButton.removeEventListener('click', closeBigPicture);
};

const showComments = () => {
  commentsList.innerHTML = '';

  const commentsToShow = allComments.slice(0, commentsShownCount);

  commentsToShow.forEach((comment) => {
    const commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');

    commentItem.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    commentsList.appendChild(commentItem);
  });


  commentsCountElement.textContent = commentsToShow.length;
  totalCommentsCountElement.textContent = allComments.length;

  if (commentsShownCount >= allComments.length) {
    loadMoreCommentsButton.classList.add('hidden');
  } else {
    loadMoreCommentsButton.classList.remove('hidden');
  }
};

export const openBigPicture = (photoData) => {
  bigPictureImage.src = photoData.url;
  bigPictureImage.alt = photoData.description;
  likesCountElement.textContent = photoData.likes;

  allComments = photoData.comments;


  commentsShownCount = Math.min(COMMENTS_PER_PAGE, allComments.length);

  showComments();

  captionElement.textContent = photoData.description;

  bigPictureContainer.classList.remove('hidden');

  commentCountBlock.classList.add('hidden');


  onLoadMoreComments = () => {
    commentsShownCount += COMMENTS_PER_PAGE;
    if (commentsShownCount > allComments.length) {
      commentsShownCount = allComments.length;
    }
    showComments();
  };


  loadMoreCommentsButton.removeEventListener('click', onLoadMoreComments);


  if (allComments.length > COMMENTS_PER_PAGE) {
    loadMoreCommentsButton.classList.remove('hidden');
    loadMoreCommentsButton.addEventListener('click', onLoadMoreComments);
  } else {
    loadMoreCommentsButton.classList.add('hidden');
    loadMoreCommentsButton.removeEventListener('click', onLoadMoreComments);
  }

  document.body.classList.add('modal-open');

  if (escKeyHandler) {
    document.removeEventListener('keydown', escKeyHandler);
  }


  escKeyHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      closeBigPicture();
    }
  };
  document.addEventListener('keydown', escKeyHandler);

  closeButton.addEventListener('click', closeBigPicture);
};
