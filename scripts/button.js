window.onload=function(){

const playground = document.getElementById('playground');
const button = document.getElementById('button');

let userPoints = 0;
let buttonPoints = 0;

let positionX = button.style.left;
let positionY = button.style.top;

button.addEventListener('mouseenter', runOverEvent);
button.addEventListener('click', runButtonClickEvent);
button.addEventListener('click', colorChangeHit);

playground.addEventListener('click', runPlaygroundClickEvent);
playground.addEventListener('click', colorChangeMiss);

function runOverEvent(e) {
  if (!timerExecuted){
    ProgressBar();
    timerExecuted = true;
  }
    setTimeout(function x() {
      W = button.offsetWidth;
      H = button.offsetHeight;
      newPositionX = positionX + (Math.ceil(Math.random() * (window.innerWidth - (W + 20)))) + 'px';
      newPositionY = positionY + (Math.ceil(Math.random() * (window.innerHeight - (H + 20)))) + 'px';
      button.style.left = newPositionX
      button.style.top = newPositionY
    }, 100);
}

document.getElementById('user-points').innerHTML = userPoints;
document.getElementById('button-points').innerHTML = buttonPoints;

function runButtonClickEvent(e) {
    e.stopPropagation();
    userPoints = userPoints + 1;
    document.getElementById('user-points').innerHTML = userPoints;
    newPositionY = positionY + (Math.ceil(Math.random() * (window.innerHeight - 200))) + 'px';
    button.style.top = newPositionY
}

function runPlaygroundClickEvent() {
    buttonColor = `red`
    buttonPoints = buttonPoints + 1;
    document.getElementById('button-points').innerHTML = buttonPoints;
}

setInterval (function buttonFacesChange() {
      const words = ['Catch me!', 'Come on', ':D', 'Too slow!', 'hehe', 'Fun <3']
        actualWord = words[(Math.ceil(Math.random() * words.length -1))]
        document.getElementById('button').innerHTML = actualWord;
}, 4000)

function colorChangeHit() {
    button.style.background = "greenyellow";
    setTimeout( () => {
        button.style.background = "#0bc7ec"
    }, 600)    
}

function colorChangeMiss() {
    button.style.background = "#f02151";
    setTimeout( () => {
        button.style.background = "#0bc7ec"
    }, 600)    
}

//------------------------------ KOD KTORY MA ISC DO LEVELS 
let userLevel = 1;

let buttonWidth = button.offsetWidth
let buttonHeight = button.offsetHeight
let buttonTransition = button.style.transition

setInterval( 
    function pointsCheck(){
        level = document.getElementById('level')
        level.innerHTML = `Level: ${userLevel}`

        switch(true) {
            case (userPoints >= 10 && userPoints < 20):
                userLevel = 2;
                newWidth = ((buttonWidth - 50) + 'px');
                button.style.width = newWidth;
                break;
            case (userPoints >= 20 && userPoints < 30):
                userLevel = 3;
                newHeight = ((buttonHeight - 60) + 'px');
                button.style.height = newHeight;
              break;
            case (userPoints >= 30 && userPoints < 40):
                userLevel = 4;
                newTransition = `top 0.6s ease-out 0s, left 0.6s ease-out 0s, background 0.1s,  width 3s, height 0.6s `;
                button.style.transition = newTransition;
              break;
            case (userPoints >= 40 && userPoints < 50):
                userLevel = 5;
                newWidth = ((buttonWidth - 130) + 'px');
                button.style.width = newWidth;
                newHeight = ((buttonHeight - 100) + 'px');
                button.style.height = newHeight;
              break;
            case (userPoints >= 50 && userPoints < 60):
                userLevel = 6;
                newWidth = ((buttonWidth - 190) + 'px');
                button.style.width = newWidth;
                newHeight = ((buttonHeight - 100) + 'px');
                button.style.height = newHeight;
              break;
            case (userPoints >= 60 && userPoints < 70):
                userLevel = 7;
                newTransition = `top 0.3s ease-out 0s, left 0.3s ease-out 0s, background 0.1s,  width 3s, height 0.6s `;
                button.style.transition = newTransition;
              break;
            case (userPoints >= 70 && userPoints < 80):
                userLevel = 8;
              break;
            case (userPoints >= 80 && userPoints < 90):
                userLevel = 9;
              break;
            case (userPoints >= 90 && userPoints < 100):
                userLevel = 10;
                newTransition = `top 0.25s ease-out 0s, left 0.25s ease-out 0s, background 0.1s,  width 3s, height 0.6s `;
                button.style.transition = newTransition;
              break;
            case (userPoints >= 100):
                userLevel = 'Finished';
              break; 
            default:
             userLevel = 1
          }
    }
, 100);

// ========================TIMER===============================

let timerExecuted = false;
let timeLeft;
const ProgressBar = () => {

  document.querySelector('.progress-bar').style.display = "block"; 
  const timeLimit = 10;
  let timePassed = 0;
  timeLeft = timeLimit;

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60) > 9 ? `${Math.floor(time / 60)}` : `0${Math.floor(time / 60)}`;
    let seconds = time % 60 > 9 ? `${time % 60}` : `0${time % 60}`;
    return `${minutes}:${seconds}`;
  }

  const startTimer = () => {
    const timerInterval = setInterval(() => {
      timePassed += 1;
      timeLeft = timeLimit - timePassed;
      document.querySelector('.progress-bar-timer>span').innerHTML = `Time left: ${formatTime(timeLeft)}`;
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        document.querySelector('.progress-bar').style.display = "none";
        timerExecuted = false;
        button.style.display = `none`;
        openPopup()
        makeClickable()
        // TU DODAC FUNKCJE RESTART
      }
    }, 1000)
  }

// YOU CAN ADD this line TO MAKE IT LIGHTSABER
//      <figure class="progress-bar-lightsaber-handle"><img src="static/ui/LightsaberHandle.png" alt=""></figure>

  document.querySelector('.progress-bar').innerHTML =
     `<div class="progress-bar-wrapper">
  
        <div class="progress-bar-lightsaber-empty">
          <div class="progress-bar-lightsaber-full"></div>
        </div>
      </div>
      <div class="progress-bar-timer">
        <span>Time left: ${formatTime(timeLeft)}</span>
      </div>`

  const animationBar = document.getElementsByClassName('progress-bar-lightsaber-full')[0];
  const animationBarTimer = document.getElementsByClassName('progress-bar-timer')[0];

  animationBar.style.animation = `progress-bar ${timeLimit}s linear forwards`;
  animationBarTimer.style.animation = `text-color ${timeLimit}s linear forwards`;

  startTimer();
}

//---------------------------PODUMOWANIE PKT---------------------------

const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
 
function openPopup(){
  const modal = document.getElementById('modals')
  openModal(modal);
  makeClickable(modal);
  let ratio = (userPoints/buttonPoints).toFixed(2);
  document.querySelector('#user-final-points').innerHTML = `Your final points was: ${userPoints}`
  document.querySelector('#user-final-level').innerHTML = `You reached level: ${userLevel}`
  document.querySelector('#you-hit').innerHTML = `Hits: ${userPoints}`
  document.querySelector('#you-miss').innerHTML = `Misses: ${buttonPoints}`
  document.querySelector('#ratio').innerHTML = `Your Hit/Miss Ratio was: ${ratio}`


}

closeModalButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const modal = button.closest('.modals')
    closeModal(modal)
  })
})

overlay.addEventListener('click', (e) => {
  e.stopPropagation();
  const modals = document.querySelectorAll('.modals.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
  modal.classList.remove('clickable')
  overlay.classList.remove('clickable')
}

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function makeClickable(modal){
  setTimeout(() =>{
    if (modal == null) return
    modal.classList.add('clickable')
    overlay.classList.add('clickable')
  },1800)
}
//------------------------------HALL OF FAME

const hallOfFameButton = document.getElementById('hall-of-fame-button');

hallOfFameButton.addEventListener('click', openHallOfFame);

function openHallOfFame(){
  console.log('hielou')
};

//------------------------------RESTART

function restartGame() {
  button.style.display = `block`
  button.style.left = `auto`
  button.style.top = `auto`
  button.style.width = `330px`
  button.style.height = `160px`
  button.style.transition = ` top 1s ease-out 0s, left 1s ease-out 0s, background 0.1s, width 0.6s, height 0.6s `
  userPoints = 0;
  buttonPoints = 0;
  userLevel = 1;
  document.getElementById('user-points').innerHTML = userPoints;
  document.getElementById('button-points').innerHTML = buttonPoints;
  document.getElementById('level').innerHTML = `Level: ${userLevel}`;
}

closeModalButtons.forEach(button => {
  button.addEventListener('click', restartGame)
})

overlay.addEventListener('click', restartGame)

}
// GAME MODS: Time attack, best time, keep up