import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"
import Notiflix from 'notiflix';

//inicjalizacja Notyiflix
Notiflix.Notify.init({
  width: '300px',
  position: 'center-top',
  distance: '40px',
  opacity: 1,
  borderRadius: '5px',
  cssAnimation: true,
  cssAnimationDuration: 700,
  cssAnimationStyle: 'zoom', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
  closeButton: true,
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
});

// wyszukiwanie elementów html
const dateInput = document.querySelector("#datetime-picker");
const startButton = document.querySelector('button')
const dataDays = document.querySelector('[data-days]')
const dataHours = document.querySelector('[data-hours]')
const dataMinutes = document.querySelector('[data-minutes]')
const dataSeconds = document.querySelector('[data-seconds]')

//zablokowanie przycisku start
startButton.disabled = true;

//deklaracja zmiennych globalnych
let userDate; //data wybrana przez uzytkownika
let timerId //zmienna dla timera

//ustawienie kalendarza
const options = {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      //funkcja sprawdzająca date po wybraniu daty przez uzytkownika i zamknięciu kalendarza
      onClose(selectedDates) {
        userDate = selectedDates[0];
          if (userDate >= new Date()) { // sprawdzenie waruków daty
            startButton.disabled = false; //odblokowanie przycisku start
            difference = userDate - new Date()//obliczenie rożnicy dat
            return difference
          } else if (userDate <= new Date()) {
              dateInput._flatpickr.setDate(new Date()) //ustawienie aktualnej daty
            Notiflix.Notify.warning("Please choose a date in the future")
          }
      },
    
}

//funkcja konwertująca ms na dni godziny itp
function convertMs(ms) {
// Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

// Remaining days
  const days = Math.floor(ms / day);
// Remaining hours
  const hours = Math.floor((ms % day) / hour);
// Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
// Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

//funkcja uruchamiająca timer
function startTimer() {
  timerId = setInterval(timer,100)
  startButton.removeEventListener('click', startTimer)
  startButton.addEventListener('click', clearTimer)
  startButton.textContent = 'Stop'
}

// funkcja pracy timera
function timer() {
  if (difference > 99) {
    difference = difference - 100;
    setDays()
  } else {
    clearTimer()
  }
}

// funkcja wyswietlania poszczególnych elementów daty
function setDays() {
  timeDiff = convertMs(difference)
  dataDays.textContent = timeDiff.days.toString().padStart(2, '0'); //ustawienie nowej liczby w polu daty jako string i z dwoma miejscami (jezeli jedna cyfra to z przodu jest 0)
  dataHours.textContent = timeDiff.hours.toString().padStart(2, '0');
  dataMinutes.textContent = timeDiff.minutes.toString().padStart(2, '0');
  dataSeconds.textContent = timeDiff.seconds.toString().padStart(2, '0');
}

// funkcja wyłaczenia timera
function clearTimer() {
  clearTimeout(timerId)
  dataDays.textContent = '00'
  dataHours.textContent = '00'
  dataMinutes.textContent = '00'
  dataSeconds.textContent = '00'
  startButton.removeEventListener('click', clearTimer)
  startButton.addEventListener('click', startTimer)
  startButton.textContent = 'Start'
  dateInput._flatpickr.clear()
  difference = 0;
}

// nasłuchowanie
dateInput.addEventListener('focus', function () {
  let fp = flatpickr(dateInput, options); // otworzenie kalendarza
})
startButton.addEventListener('click', startTimer)








