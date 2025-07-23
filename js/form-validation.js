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
    console.log('Закрытие формы по Esc');
  }

  form.addEventListener('#upload-submit', (e) => {
    e.preventDefault();
    if (pristine.validate()) {
      console.log('Форма валидна, можно отправлять');
    }
  });
});
