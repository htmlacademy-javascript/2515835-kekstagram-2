document.addEventListener('DOMContentLoaded', () => {
  let currentEffect = 'none';
  const scaleInput = document.querySelector('.scale__control--value');
  const btnSmaller = document.querySelector('.scale__control--smaller');
  const btnBigger = document.querySelector('.scale__control--bigger');
  const previewImage = document.querySelector('.img-upload__preview img');
  const imageInput = document.querySelector('#upload-file');
  const imgUploadOverlay = document.querySelector('.img-upload__overlay');
  const body = document.body;


  function getCurrentScale() {
    return parseInt(scaleInput.value, 10);
  }

  function setScale(scale) {
    scale = Math.max(25, Math.min(100, scale));
    scaleInput.value = `${scale}%`;
    previewImage.style.transform = `scale(${scale / 100})`;
  }

  btnSmaller.addEventListener('click', () => {
    const currentScale = getCurrentScale();
    setScale(currentScale - 25);
  });

  btnBigger.addEventListener('click', () => {
    const currentScale = getCurrentScale();
    setScale(currentScale + 25);
  });


  setScale(getCurrentScale());

  const effectRadios = document.querySelectorAll('input[name=effect]');
  const effectLevelContainer = document.querySelector('.effect-level');
  const sliderContainer = effectLevelContainer.querySelector('.effect-level__slider');
  const effectLevelNumberInput = effectLevelContainer.querySelector('.effect-level__value');


  noUiSlider.create(sliderContainer, {
    start: [100],
    range: {
      min: [0],
      max: [100]
    },
    step: 1,
    connect: 'lower'
  });


  function setFilter(effect, level) {
    switch (effect) {
      case 'none':
        previewImage.style.filter = '';
        break;
      case 'chrome':
        previewImage.style.filter = `grayscale(${level})`;
        break;
      case 'sepia':
        previewImage.style.filter = `sepia(${level})`;
        break;
      case 'marvin':
        previewImage.style.filter = `invert(${level}%)`;
        break;
      case 'phobos':
        previewImage.style.filter = `blur(${level}px)`;
        break;
      case 'heat':
        previewImage.style.filter = `brightness(${level})`;
        break;
    }
  }


  function applyEffect(effect) {
    currentEffect = effect;

    if (effect === 'none') {
      effectLevelContainer.style.display = 'none';
      previewImage.style.filter = '';
      effectLevelNumberInput.value = '0';
    } else {
      effectLevelContainer.style.display = 'block';

      let min, max, step, initialValue;

      switch (effect) {
        case 'chrome':
        case 'sepia':
          min = 0;
          max = 1;
          step = 0.1;
          initialValue = 1;
          break;
        case 'marvin':
          min = 0;
          max = 100;
          step = 1;
          initialValue = 100;
          break;
        case 'phobos':
          min = 0;
          max = 3;
          step = 0.1;
          initialValue = 3;
          break;
        case 'heat':
          min = 1;
          max = 3;
          step = 0.1;
          initialValue = 3;
          break;
      }

      sliderContainer.noUiSlider.updateOptions({
        range: { min, max },
        step,
        start: [initialValue]
      });

      sliderContainer.noUiSlider.set(initialValue);
      setFilter(effect, initialValue);
      effectLevelNumberInput.value = initialValue.toString();

      sliderContainer.noUiSlider.on('update', (values) => {
        const value = parseFloat(values[0]);
        setFilter(currentEffect, value);
        effectLevelNumberInput.value = value.toString();
      });
    }
  }


  effectRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      applyEffect(radio.value);
    });
  });

  function updateEffectPreviews(imageSrc) {
    const previews = document.querySelectorAll('.effects__preview');

    previews.forEach((preview) => {
      const img = preview.querySelector('img');
      if (img) {
        img.src = imageSrc;
      } else {
        preview.style.backgroundImage = `url(${imageSrc})`;
      }
    });
  }

  imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageSrc = URL.createObjectURL(file);
      previewImage.src = imageSrc;
      updateEffectPreviews(imageSrc);

      imgUploadOverlay.classList.remove('hidden');
      body.classList.add('modal-open');
    }
  });

  applyEffect('none');

});
