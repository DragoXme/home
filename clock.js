function displayGreetingAndTime() {
  function updateClock() {
    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    
    let greeting = '';
    if (hour >= 5 && hour < 12) {
      greeting = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }
    
    const formattedTime = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    const timeElement = document.querySelector('.time');
    if (timeElement) {
      timeElement.textContent = formattedTime;
    }
    
    const greetingElement = document.querySelector('.greeting');
    if (greetingElement) {
      greetingElement.textContent = greeting;
    }
    
    // Schedule the next update when the next minute starts
    const nextMinute = (60 - now.getSeconds()) * 1000;
    setTimeout(updateClock, nextMinute);
  }

  updateClock();
}

displayGreetingAndTime();


//day and date.....................................

function updateDate() {
  const now = new Date();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const dayOfWeek = daysOfWeek[now.getDay()];
  const day = now.getDate();
  const month = months[now.getMonth()];
  
  const formattedDate = `${dayOfWeek}, ${day} ${month}`;
  
  const dateElement = document.querySelector('.date');
  if (dateElement) {
    dateElement.textContent = formattedDate;
  }
  
  // Schedule the next update when the next day starts
  const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const timeUntilNextDay = nextDay - now;
  setTimeout(updateDate, timeUntilNextDay);
}

updateDate();


//day and date.....................................