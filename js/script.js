document.addEventListener('DOMContentLoaded', () => {
  const imageInput = document.querySelector('#upload-file');
  const imgUploadOverlay = document.querySelector('.img-upload__overlay');
  const imagePreview = document.querySelector('.img-upload__preview img');
  const body = document.body;


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


  const cancelButton = document.getElementById('upload-cancel');
  if (cancelButton) {
    cancelButton.addEventListener('click', closeOverlay);
  }


  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeOverlay();
    }
  });


  function closeOverlay() {
    if (imgUploadOverlay && imagePreview) {
      imgUploadOverlay.classList.add('hidden');
      body.classList.remove('modal-open');
      imageInput.value = '';
      imagePreview.src = 'img/upload-default-image.jpg';
    }
  }
});
