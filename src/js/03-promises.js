import Notiflix from 'notiflix';

//inicjalizacja Notyiflix
Notiflix.Notify.init({
  width: '300px',
  position: 'right-top',
  distance: '40px',
  opacity: 1,
  borderRadius: '5px',
  timeout: 5000,
  cssAnimation: true,
  cssAnimationDuration: 700,
  cssAnimationStyle: 'zoom', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
  useIcon: true,
  warning: {
    background: '#ff5549',
    textColor: '#fff',
    childClassName: 'notiflix-notify-warning',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-exclamation-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(238,191,49,0.2)',
  },
  success: {
    background: '#32c682',
    textColor: '#fff',
    childClassName: 'notiflix-notify-success',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-check-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(50,198,130,0.2)',
  },

});

//inicjalizacja zmiennych globalnych
let firstDelayData
let delayStepData 
let amonutData 

//wyszukiwanie przycisku
let createPromiseButton = document.querySelector('button')

//nasłuchiwanie zdarzeń
document.addEventListener('input', dataInput)
createPromiseButton.addEventListener('click', start);

//funkcja wprowadzania danych
function dataInput(event) {
  event.preventDefault();
  const inputName = event.target.name
  if (inputName === 'delay') {
    firstDelayData = parseInt(event.target.value)
  }
  else if (inputName === 'step') {
    delayStepData = parseInt(event.target.value)
  }
  else if (inputName === 'amount') {
    amonutData = parseInt(event.target.value)
  } 
}

//funkcja promise
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return Promise.resolve({ position, delay })
  } else {
    return Promise.reject({ position, delay })
  }
    
}

//funkcja opóźniajaca uruchomienie promise
function start(event) {
  event.preventDefault()
  for (let i = 1; i <= amonutData; i += 1) {
    let currentDelay = (i === 1) ? firstDelayData : firstDelayData + (i - 1) * delayStepData;
  setTimeout(() => {
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }, currentDelay);
}
  }






  