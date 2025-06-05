document.addEventListener('DOMContentLoaded', () => {
  const scaleInput = document.querySelector('.scale__control--value');
  const btnSmaller = document.querySelector('.scale__control--smaller');
  const btnBigger = document.querySelector('.scale__control--bigger');
  const previewImage = document.querySelector('.img-upload__preview img');


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
const effectLevelValue = effectLevelContainer.querySelector('.effect-level__value');


const effectLevelNumberInput = effectLevelContainer.querySelector('.effect-level__value');


let currentEffect='none';


noUiSlider.create(sliderContainer, {
    start: [100],
    range: {
      min: [0],
      max: [100]
    },
    step:1,
    connect:'lower'
});


function getMaxForEffect(effect){
    switch(effect){
      case 'chrome': return 1.0;
      case 'sepia': return 1.0;
      case 'marvin': return 1.0;
      case 'phobos': return 3.0;
      case 'heat': return 2.0;
    }
    return 1.0;
}

function setFilter(effect, level) {
    switch(effect) {
      case 'none':
        previewImage.style.filter='';
        break;
      case 'chrome':
        previewImage.style.filter=`grayscale(${level})`;
        break;
      case 'sepia':
        previewImage.style.filter=`sepia(${level})`;
        break;
      case 'marvin':
        previewImage.style.filter=`invert(${level *100}%)`;
        break;
      case 'phobos':
        previewImage.style.filter=`blur(${level *3}px)`;
        break;
      case 'heat':
        previewImage.style.filter=`brightness(${1 + level})`;
        break;
    }
}


function applyEffect(effect) {
    currentEffect=effect;

    if(effect==='none'){

      effectLevelContainer.style.display='none';


      previewImage.style.filter='';


      effectLevelNumberInput.value='0';

    } else{
      effectLevelContainer.style.display='block';
      let initialLevel=1;

      switch(effect){
        case 'chrome': initialLevel=1; break;
        case 'sepia': initialLevel=1; break;
        case 'marvin': initialLevel=1; break;
        case 'phobos': initialLevel=3; break;
        case 'heat': initialLevel=2; break;
      }

      sliderContainer.noUiSlider.set(initialLevel*getMaxForEffect(effect));


      setFilter(effect, initialLevel);


      sliderContainer.noUiSlider.on('update', (values) => {
        const valuePercent=parseFloat(values[0]);
        let level;

        switch(effect){
          case 'chrome':
          case 'sepia':
          case 'marvin':
          case 'phobos':
          case 'heat':
            level=valuePercent/100;
            setFilter(effect, level);
            break;
        }


        effectLevelNumberInput.value=valuePercent.toFixed(2);

      });
    }
}


effectRadios.forEach(radio => {
   radio.addEventListener('change', () => {
     applyEffect(radio.value);
   });
});

applyEffect('none');

});
