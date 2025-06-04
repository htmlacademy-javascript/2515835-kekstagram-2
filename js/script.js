const imageInput = document.getElementById('upload-file');
const imgUploadOverlay = document.getElementById('img-upload-overlay');
const imagePreview = document.getElementById('image-preview');
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
