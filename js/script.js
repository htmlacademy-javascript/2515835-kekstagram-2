const imageInput = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imagePreview = document.querySelector('.image-preview img');
const body = document.body;


imageInput.addEventListener('change', function (e) {
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


document.getElementById('upload-cancel').addEventListener('click', closeOverlay);
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeOverlay();
    }
});


function closeOverlay() {
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    imageInput.value = '';
    imagePreview.src = 'img/upload-default-image.jpg';
}
