import { sendFormData } from './api';

const imageInput = document.querySelector('#upload-file');
const imagePreview = document.querySelector('.img-upload__preview img');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const uploadFormButton = document.querySelector('.img-upload__submit');
let pristine;

const cancelButton = document.querySelector('#upload-cancel');

if (cancelButton) {
  const onCancelButtonClick = () => {
    closeOverlay();
  };
  cancelButton.addEventListener('click', onCancelButtonClick);
}

function closeOverlay() {
  pristine.reset();
  if (imgUploadOverlay && imagePreview) {
    uploadForm.reset();
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    imageInput.value = '';
  }

}

function closeMessageHandler(templateId, evt) {
  const target = evt.target;
  if (target.closest('button') || target.classList.contains(`${templateId}`)) {
    closeMessage(templateId);
  }
}

function closeMessage(templateId) {
  const message = document.querySelector(`.${templateId}`);
  if (message) {
    message.remove();
    document.removeEventListener('click', closeMessageHandler);
    document.removeEventListener('keydown', closeMessageHandler);
  }
}

const showMessage = (templateId) => {
  const template = document.querySelector(`#${templateId}`);
  if (!template) {
    return;
  }
  const clone = template.content.cloneNode(true);
  document.body.appendChild(clone);

  const onDocumentClick = (evt) => closeMessageHandler(templateId, evt);
  document.addEventListener('click', onDocumentClick);

  if (templateId === 'succes') {
    closeOverlay();
  }

  setTimeout(() => {
    closeMessage(templateId);
  }, 5000);
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#upload-select-image');
  pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'is-invalid',
    successClass: 'is-valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'invalid-feedback'
  });

  const hashtagsInput = document.querySelector('.text__hashtags');
  const commentInput = document.querySelector('.text__description');

  pristine.addValidator(hashtagsInput, (value) => {
    if (!value) {
      return true;
    }

    const hashtags = value.trim().split(/\s+/);

    if (hashtags.length > 5) {
      return false;
    }

    const lowerHashtags = hashtags.map((tag) => tag.toLowerCase());
    const uniqueHashtags = new Set(lowerHashtags);
    if (uniqueHashtags.size !== hashtags.length) {
      return false;
    }

    for (const tag of hashtags) {
      if (!tag.startsWith('#')) {
        return false;
      }
      if (tag.length === 1) {
        return false;
      }
      if (tag.length > 20) {
        return false;
      }
      const tagBody = tag.slice(1);
      if (!/^[A-Za-zА-Яа-яЁё0-9]+$/.test(tagBody)) {
        return false;
      }
      if (tag === '#') {
        return false;
      }


    }
    return true;
  }, 'Некорректные хештеги');

  if (imageInput && imagePreview && imgUploadOverlay) {
    const onImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          imagePreview.src = event.target.result;
        };
        reader.readAsDataURL(file);
        imgUploadOverlay.classList.remove('hidden');
        body.classList.add('modal-open');
      }
    };
    imageInput.addEventListener('change', onImageChange);
  }

  pristine.addValidator(
    commentInput,
    (value) => {
      if (!value) {
        return true;
      }
      return value.length <= 140;
    },
    'Комментарий не может превышать 140 символов'
  );


  const onHashtagsInputChange = () => pristine.validate();
  hashtagsInput.addEventListener('input', onHashtagsInputChange);

  const onCommentInputChange = () => pristine.validate();
  commentInput.addEventListener('input', onCommentInputChange);

  const onDocumentKeyDown = (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      const activeElement = document.activeElement;
      if (
        activeElement === hashtagsInput ||
        activeElement === commentInput
      ) {
        return;
      }

      const errorMessage = document.querySelector('.error');
      const successMessage = document.querySelector('.success');

      if (errorMessage) {
        closeMessage('error');

        return;
      }
      if (successMessage) {
        closeMessage('success');
      }

      closeOverlay();
    }
  };

  document.addEventListener('keydown', onDocumentKeyDown);

  const onUploadFormSubmit = (e) =>{
    e.preventDefault();
    if (pristine.validate()) {
      uploadFormButton.disabled = true;
      const formData = new FormData(uploadForm);
      sendFormData(formData)
        .then(() => {
          showMessage('success');
          uploadForm.reset();
          closeOverlay();
          pristine.reset({});
        })
        .catch(() => {
          showMessage('error');
        }).finally(() => {
          uploadFormButton.disabled = false;
        });
    }
  };
  uploadForm.addEventListener('submit', onUploadFormSubmit);
});

export { showMessage };
