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
    const lowerHashtags = hashtags.map(tag => tag.toLowerCase());
    const uniqueHashtags = new Set(lowerHashtags);

    if (hashtags.length > 5) return false;
    if (uniqueHashtags.size !== hashtags.length) return false;

    for (const tag of hashtags) {
      if (!/^#[A-Za-z0-9]{1,19}$/.test(tag)) return false;
    }
    return true;
  }, 'Некорректные хештеги');


  pristine.addValidator(
    commentInput,
    (value) => !value || value.length <= 140,
    'Комментарий не может превышать 140 символов'
  );


  hashtagsInput.addEventListener('input', () => pristine.validate());
  commentInput.addEventListener('input', () => pristine.validate());


  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (pristine.validate()) {
      isOverlayClosed = false;
      toggleOverlayListeners(true);

    } else {

    }
  });

  let isOverlayClosed = false;

  function toggleOverlayListeners(add) {
    if (add) {
      isOverlayClosed = false;
      document.addEventListener('keydown', closeOverlay);
      hashtagsInput.addEventListener('focus', removeOverlayListener);
      commentInput.addEventListener('focus', removeOverlayListener);
      hashtagsInput.addEventListener('blur', addOverlayListener);
      commentInput.addEventListener('blur', addOverlayListener);
    } else {
      document.removeEventListener('keydown', closeOverlay);
      hashtagsInput.removeEventListener('focus', removeOverlayListener);
      commentInput.removeEventListener('focus', removeOverlayListener);
      hashtagsInput.removeEventListener('blur', addOverlayListener);
      commentInput.removeEventListener('blur', addOverlayListener);

      isOverlayClosed = true;
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
    const activeElement = document.activeElement;


    if (activeElement === hashtagsInput || activeElement === commentInput) return;

    if (e.key === 'Escape') {
      isOverlayClosed = true;
      toggleOverlayListeners(false);


    }
  }


  toggleOverlayListeners(true);
});
