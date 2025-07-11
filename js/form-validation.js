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
    const errorMessages = [];

    if (!value) {
      return true;
    }

    const hashtags = value.split(' ').map((tag) => tag.toLowerCase());
    const uniqueHashtags = new Set(hashtags);

    if (hashtags.length > 5) {
      errorMessages.push('Слишком много хештегов (максимум 5).');
    }

    if (uniqueHashtags.size !== hashtags.length) {
      errorMessages.push('Хештеги должны быть уникальными.');
    }

    for (const tag of uniqueHashtags) {
      if (!/^#[A-Za-z0-9]{1,19}$/.test(tag)) {
        errorMessages.push('Некорректный формат хештега.');
      }
    }

    if (errorMessages.length > 0) {
      return false;
    }

    return true;
  }, 'Некорректные хештеги');


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

  hashtagsInput.addEventListener('input', () => {
    pristine.validate();
  });

  commentInput.addEventListener('input', () => {
    pristine.validate();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();


    if (pristine.validate()) {
      // Форма валидна! Отправка данных...

    } else {
      // Форма содержит ошибки. Исправьте их перед отправкой.
    }
  });

  let isOverlayClosed = false;

  function toggleOverlayListeners(add) {
    if (add) {
      hashtagsInput.addEventListener('focus', removeOverlayListener);
      commentInput.addEventListener('focus', removeOverlayListener);
      hashtagsInput.addEventListener('blur', addOverlayListener);
      commentInput.addEventListener('blur', addOverlayListener);
    } else {
      hashtagsInput.removeEventListener('focus', removeOverlayListener);
      commentInput.removeEventListener('focus', removeOverlayListener);
      hashtagsInput.removeEventListener('blur', addOverlayListener);
      commentInput.removeEventListener('blur', addOverlayListener);
    }
  }

  function removeOverlayListener() {
    document.removeEventListener('keydown', closeOverlay);
  }

  function addOverlayListener() {
    if (!isOverlayClosed) {
      document.addEventListener('keydown', closeOverlay);
    }
  }

  function closeOverlay(e) {
    if (e.key === 'Escape') {
      isOverlayClosed = true;
      toggleOverlayListeners(false);

    }
  }

  toggleOverlayListeners(true);
});
