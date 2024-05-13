const startTime = 50; // Time in minutes
let time = startTime * 60; // Time in seconds
let timerInterval;
let isClockRunning = false;

function updateTimer() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60; 
  document.getElementById('efs-timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  time--;
  if (time <= 0) {
    clearInterval(timerInterval);
    isClockRunning = false;
    timerSound.play();
    alert("Elixer Focus session ended!");
  }
}

function playTimerSound() {
  const timerSound = document.getElementById('timer-beep');
  timerSound.play();
}

const music = document.getElementById('efs-lofi');
function startTimerMusic() {
  setTimeout(function() {
      music.play(); // Start playing the audio
  }, 1000); // Delay in milliseconds
}

function pauseMusic() {
  music.pause(); // Pause the audio
}

function stopMusic() {
  music.pause(); // Stop the audio
  music.currentTime = 0; // Reset the audio to the beginning
}

document.getElementById('start-btn').addEventListener('click', () => {
  if (isClockRunning === false) {
    timerInterval = setInterval(updateTimer, 1000);
    alert("Press OK to start the timer!");
    playTimerSound();
    startTimerMusic();
  }
  isClockRunning = true; // Sets the clock to running which prevents spamming
});

document.getElementById('pause-btn').addEventListener('click', () => {
  if (isClockRunning === false) {
    alert("The timer is not running!");
    return;
  }
  else {
    clearInterval(timerInterval);
    isClockRunning = false;
    pauseMusic();
    alert("The timer has been paused!");
  }
});

document.getElementById('stop-btn').addEventListener('click', () => {
  if (isClockRunning === true || time < startTime * 60) {
    const confirmStop = confirm("Are you sure you want to stop the timer?");
    if (!confirmStop) {
      return;
    }
    else {
      clearInterval(timerInterval);
      time = startTime * 60; // Reset time to 50 minutes
      updateTimer();
      stopMusic();
      isClockRunning = false;
    }
  }
  else {
    alert("The timer is not running!");
  }
});