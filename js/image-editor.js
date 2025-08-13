document.addEventListener('DOMContentLoaded', () => {
  const scaleInput = document.querySelector('.scale__control--value');
  const btnSmaller = document.querySelector('.scale__control--smaller');
  const btnBigger = document.querySelector('.scale__control--bigger');
  const previewImage = document.querySelector('.img-upload__preview img');
  const imageInput = document.querySelector('#upload-file');
  const effectLevelContainer = document.querySelector('.effect-level');
  const effectLevelNumberInput = effectLevelContainer.querySelector('.effect-level__value');
  const sliderContainer = effectLevelContainer.querySelector('.effect-level__slider');

  function resetImageEditor() {
    scaleInput.value = '100%';
    previewImage.style.transform = 'scale(1)';
    previewImage.style.filter = '';
    effectLevelNumberInput.value = '0';
    effectLevelContainer.style.display = 'none';
    if (sliderContainer.noUiSlider) {
      sliderContainer.noUiSlider.set(0);
    }
  }

  btnSmaller.addEventListener('click', () => {
    const currentScale = parseInt(scaleInput.value, 10);
    const newScale = Math.max(25, currentScale - 25);
    scaleInput.value = `${newScale}%`;
    previewImage.style.transform = `scale(${newScale / 100})`;
  });

  btnBigger.addEventListener('click', () => {
    const currentScale = parseInt(scaleInput.value, 10);
    const newScale = Math.min(100, currentScale + 25);
    scaleInput.value = `${newScale}%`;
    previewImage.style.transform = `scale(${newScale / 100})`;
  });

  imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      resetImageEditor();
      const imageSrc = URL.createObjectURL(file);
      previewImage.src = imageSrc;
    }
  });

  noUiSlider.create(sliderContainer, {
    start: [0],
    range: {
      min: [0],
      max: [100]
    },
    step: 1,
    connect: 'lower'
  });

  function applyEffect(effect, imgPreview, effectContainer, levelInput, slider) {
    if (effect === 'none') {
      effectContainer.style.display = 'none';
      imgPreview.style.filter = '';
    } else {
      effectContainer.style.display = 'block';
      switch (effect) {
        case 'chrome':
          imgPreview.style.filter = 'grayscale(0)';
          break;
        case 'sepia':
          imgPreview.style.filter = 'sepia(100%)';
          break;
        default:
          imgPreview.style.filter = '';
      }

      slider.noUiSlider.on('update', (values) => {
        const value = values[0];
        levelInput.value = value;
        if (effect === 'chrome') {
          imgPreview.style.filter = `grayscale(${100 - value}%)`;
        } else if (effect === 'sepia') {
          imgPreview.style.filter = `sepia(${value}%)`;
        }
      });
    }
  }

  const effectRadios = document.querySelectorAll('input[name=effect]');
  effectRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        const effect = radio.value;
        applyEffect(effect, previewImage, effectLevelContainer, effectLevelNumberInput, sliderContainer);
      }
    });
  });

});

