import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"

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
      //funkcja sprawdzająca date po wybraniu daty przez uzytkownika
      onClose(selectedDates) {
        userDate = selectedDates[0];
          if (userDate >= new Date()) { // sprawdzenie waruków daty
            startButton.disabled = false; //zablokowanie przycisku start
            difference = userDate - new Date()//obliczenie rożnicy dat
            return difference
          } else if (userDate <= new Date()) {
              dateInput._flatpickr.setDate(new Date()) //ustawienie aktualnej daty
              window.alert("Please choose a date in the future") //wyswietlenie alertu
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

//funkcja uruchamiająca starter
function startTimer() {
  setDays()
  startButton.removeEventListener('click', startTimer)
  startButton.addEventListener('click', clearTimer)
  startButton.textContent='Stop'
  timerId = setInterval(timer,100)
  
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
  dataDays.textContent = timeDiff.days
  dataHours.textContent = timeDiff.hours
  dataMinutes.textContent = timeDiff.minutes
  dataSeconds.textContent = timeDiff.seconds
}

// funkcja wyłaczenia timera
function clearTimer() {
  clearTimeout(timerId)
  dataDays.textContent = '00'
  dataHours.textContent = '00'
  dataMinutes.textContent = '00'
  dataSeconds.textContent = '00'
  startButton.addEventListener('click', startTimer)
  startButton.textContent='Start'

}


dateInput.addEventListener('focus', function () {
  fp = flatpickr(dateInput, options); // otworzenie kalendarza
})
startButton.addEventListener('click', startTimer)








