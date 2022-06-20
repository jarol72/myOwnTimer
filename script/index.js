let interval;

const resets = () => {
  endMessage.textContent = '';
  btnStartTimer.disabled = false;
  hrsTimer.value = "00";
  minsTimer.value = "00";
  secsTimer.value = "00";

  if(timeTitle.textContent === "Pomodoro") minsTimer.value = "25";
}

const formatValue = (value) => {
  return value.toString().padStart(2, '0');
}

const stopInterval = () => {
  clearInterval(interval);
  interval = null;
}

const getTime = () => {
  let hh = new Date().getHours();
  let mm = new Date().getMinutes();
  let ss = new Date().getSeconds();

  hours.textContent = hh.toString().padStart(2, '0');
  minutes.textContent = mm.toString().padStart(2, '0');
  seconds.textContent = ss.toString().padStart(2, '0');
  date.textContent = new Date().toLocaleDateString('es-co', { weekday:"long", day:"numeric", month:"short", year:"numeric"}) 
}

const showClock = () => {
  groupHours.style.display = 'flex';
  timeTitle.textContent = "Current Time";
  clock.classList.remove('inactive');
  timer.classList.add('inactive');

  if (!interval) interval = setInterval(getTime, 1000);
}

const showTimer = () => {
  groupHours.style.display = 'flex';
  timeTitle.textContent = "Timer";
  clock.classList.add('inactive');
  timer.classList.remove('inactive');
  stopInterval();
  resets()
}

const showStopwatch = () => {
  groupHours.style.display = 'flex';
  timeTitle.textContent = "Stopwatch";
  clock.classList.add('inactive');
  timer.classList.remove('inactive');
  stopInterval();
  resets()
}

const showPomodoro = () => {
  groupHours.style.display = 'none';
  timeTitle.textContent = "Pomodoro";
  clock.classList.add('inactive');
  timer.classList.remove('inactive');
  stopInterval();
  resets()
  minsTimer.value = '25';
}

const startTimer = () => {
  hrs = parseInt(hrsTimer.value);
  mins = parseInt(minsTimer.value);
  secs = parseInt(secsTimer.value);
  endMessage.textContent = '';
  btnStartTimer.disabled = true;

  currentTimer = setInterval(() => {
    if (hrs === 0 && mins === 0 && secs === 0) {
      clearInterval(currentTimer);
      endMessage.textContent = "Timer has finished!";
      btnStartTimer.disabled = false;
    } else {
      secs -= 1;
      if (secs < 0 && (mins || hrs)) {
        secs = 59;
        mins -= 1;
      }
      
      if (mins < 0 && hrs) {
        mins = 59;
        hrs -= 1;
      }

      hrsTimer.value = formatValue(hrs);
      minsTimer.value = formatValue(mins);
      secsTimer.value = formatValue(secs);
    }
  }, 1000);
}

const stopTimer = () => {
  console.log("Stop Timer");
  clearInterval(currentTimer);


  switch (timeTitle.textContent) {
    case 'Timer':
      console.log(timeTitle.textContent);
      endMessage.textContent = 'Timer paused';
      break;

    case 'Stopwatch':
      console.log(timeTitle.textContent);
      endMessage.textContent = 'Stopwatch paused';
      break;

    case 'Pomodoro':
      console.log(timeTitle.textContent);
      endMessage.textContent = 'Pomodoro paused';
      break;

    default:
      endMessage = '';
  }

  btnStartTimer.disabled = false;
}


const startStopwatch = () => {
  hrs = parseInt(hrsTimer.value);
  mins = parseInt(minsTimer.value);
  secs = parseInt(secsTimer.value);
  endMessage.textContent = '';
  btnStartTimer.disabled = true;

  currentTimer = setInterval(() => {
    secs += 1;
    if (secs > 59) {
      secs = 0;
      mins += 1;

      if (mins > 59) {
        secs = 0;
        hrs += 1;
      }
    }

    hrsTimer.value = formatValue(hrs);
    minsTimer.value = formatValue(mins);
    secsTimer.value = formatValue(secs);
  }, 1000);
}

const startPomodoro = () => {
  mins = parseInt(minsTimer.value);
  secs = parseInt(secsTimer.value);
  endMessage.textContent = '';
  btnStartTimer.disabled = true;

  currentTimer = setInterval(() => {
    if (mins === 0 && secs === 0) {
      clearInterval(currentTimer);
      endMessage.textContent = "Pomodoro has finished!";
      btnStartTimer.disabled = false;
    } else {
      secs -= 1;
      if (secs < 0 && mins) {
        secs = 59;
        mins -= 1;
      }

      minsTimer.value = formatValue(mins);
      secsTimer.value = formatValue(secs);
    }
  }, 1000);
}

d.addEventListener("DOMContentLoaded", showClock);

d.addEventListener("click", (e) => {
  if (e.target.matches("#navClock, .fa-clock")) {
    showClock();
    console.log("Clock");
  }
  if (e.target.matches("#navTimer, .fa-stopwatch")) {
    clearInterval(time);
    showStopwatch();
    console.log("Stopwatch");
  }
  if (e.target.matches("#navStopwatch, .fa-clock-rotate-left")) {
    clearInterval(time);
    showTimer();
    console.log("Timer");
  }
  if (e.target.matches("#navPomodoro, .fa-business-time")) {
    clearInterval(time);
    showPomodoro();
    console.log("Pomodoro");
  }
  if (e.target.matches(".btnStartTimer")) {
    if (timeTitle.textContent === "Timer") startTimer();
    if (timeTitle.textContent === "Stopwatch") startStopwatch();
    if (timeTitle.textContent === "Pomodoro") startPomodoro();
  }
  if (e.target.matches(".btnStopTimer")) {
    stopTimer();
  }
  if (e.target.matches(".btnResetTimer")) {
    clearInterval(currentTimer);
    resets();
  }
}, false);

d.addEventListener("change", (e) => {
  if (e.target.matches("input")) {
    e.target.value = formatValue(e.target.value);
  }
});