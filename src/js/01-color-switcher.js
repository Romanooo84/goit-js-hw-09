// wyszukiwanie body
let body = document.querySelector('body');
// dodanie klasy do body
body.classList.add("color");
// nasłuchowanie body
body.addEventListener('click', start);

//deklaracja zmiennych
let timerId; //zmiena dla Timera
let startButton; //zmienna dla przycisku

// funkcja zmiany wyboru koloru
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

//funkcja uruchamiająca zmianę tła
function start(event) {
    event.preventDefault();
    // spradzanie nazwy przycisku
    const switchName = event.target.textContent.toLowerCase()
    if (switchName === 'start') {
        startButton = event.target;
        //zablokowanie przysciku start
        startButton.disabled = true; 
        //uruchoimienie fukcji bgColor po 1sek.
        //bgColor zmienia color tła body i odblokowuje przycisk start
            timerId = setInterval(bgColor => {
            body.style.backgroundColor = getRandomHexColor();
        }, 1000);
    } else if (switchName === 'stop') {
        //usunięcie oczekiwania na wykonanie funkcji
        clearInterval(timerId);
        //odblokowanie przycisku start
        startButton.disabled = false;
    }

};
