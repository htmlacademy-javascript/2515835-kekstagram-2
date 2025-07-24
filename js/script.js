document.addEventListener('DOMContentLoaded', () => {

  const cancelButton = document.getElementById('upload-cancel');
  if (cancelButton) {
    cancelButton.addEventListener('click', closeOverlay);
  }

  function closeOverlay() {
    if (imgUploadOverlay && imagePreview) {
      imgUploadOverlay.classList.add('hidden');

      body.classList.remove('modal-open');
      imageInput.value = '';
      imagePreview.src = 'img/upload-default-image.jpg';
    }
  }
});
