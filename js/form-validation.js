import { sendFormData } from "./api";
const imageInput = document.querySelector('#upload-file');
const imagePreview = document.querySelector('.img-upload__preview img');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.body;

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

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#upload-select-image');
  const pristine = new Pristine(form, {
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
    if (!value) return true;

    const hashtags = value.trim().split(/\s+/);

    if (hashtags.length > 5) return false;

    const lowerHashtags = hashtags.map(tag => tag.toLowerCase());
    const uniqueHashtags = new Set(lowerHashtags);
    if (uniqueHashtags.size !== hashtags.length) return false;

    for (const tag of hashtags) {
      if (!tag.startsWith('#')) return false;
      if (tag.length < 2) return false;
      if (tag.length > 20) return false;
      const tagBody = tag.slice(1);
      if (!/^[A-Za-zА-Яа-яЁё0-9]+$/.test(tagBody)) return false;
      if (tag === '#') return false;
    }
    return true;
  }, 'Некорректные хештеги');

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeElement = document.activeElement;

      if(
        activeElement === hashtagsInput ||
        activeElement === commentInput
      ) {
        return
      }
      closeOverlay();
    }
  });

  if (imageInput && imagePreview && imgUploadOverlay) {
    imageInput.addEventListener('change', (e) => {
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
    });
  }


  pristine.addValidator(
    commentInput,
    (value) => {
      if (!value) return true;
      return value.length <= 140;
    },
    'Комментарий не может превышать 140 символов'
  );


  hashtagsInput.addEventListener('input', () => pristine.validate());
  commentInput.addEventListener('input', () => pristine.validate());


  document.addEventListener('keydown', (e) => {
    const activeElement = document.activeElement;

    if (
      activeElement === hashtagsInput ||
      activeElement === commentInput
    ) {
      return;
    }

    if (e.key === 'Escape') {
      closeOverlay();
    }
  });

  function closeOverlay() {
    if (formUploadOverlay && imagePreview) {
      formUploadOverlay.classList.add('hidden');

      body.classList.remove('modal-open');
      imageInput.value = '';
    }
  }

  const formUploadOverlay = document.querySelector('.img-upload__overlay');
  const uploadForm = document.querySelector('.img-upload__form')

  const closeForm = () => {
    formUploadOverlay.classList.add('hidden');
  }

  uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (pristine.validate()) {
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
        });
    }
  });
});

export { showMessage };
