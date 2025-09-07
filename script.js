let is24HourFormat = false;
let isDarkTheme = false;

// DOM elements
const hourHand = document.getElementById('hourHand');
const minuteHand = document.getElementById('minuteHand');
const secondHand = document.getElementById('secondHand');
const digitalTime = document.getElementById('digitalTime');
const digitalDate = document.getElementById('digitalDate');
const themeToggle = document.getElementById('themeToggle');
const formatToggle = document.getElementById('formatToggle');
const body = document.body;

// Update clock function
function updateClock() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    // Calculate angles for hands (12 o'clock is at 0 degrees, so we don't subtract 90)
    const secondAngle = seconds * 6; // 360/60 = 6 degrees per second
    const minuteAngle = (minutes * 6) + (seconds * 0.1); // 6 degrees per minute + smooth seconds movement
    const hourAngle = ((hours % 12) * 30) + (minutes * 0.5); // 30 degrees per hour + smooth minutes movement

    // Apply rotations
    secondHand.style.transform = `rotate(${secondAngle}deg)`;
    minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
    hourHand.style.transform = `rotate(${hourAngle}deg)`;

    // Update digital clock
    updateDigitalClock();
}

// Update digital clock
function updateDigitalClock() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    let timeString;
    if (is24HourFormat) {
        timeString = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
    } else {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
    }
    
    digitalTime.textContent = timeString;
    digitalDate.textContent = now.toLocaleDateString('en-US', options);
}

// Theme toggle
themeToggle.addEventListener('click', () => {
    isDarkTheme = !isDarkTheme;
    if (isDarkTheme) {
        body.className = 'dark-theme';
        themeToggle.textContent = '☀️ Light Theme';
    } else {
        body.className = 'light-theme';
        themeToggle.textContent = '🌙 Dark Theme';
    }
});

// Format toggle
formatToggle.addEventListener('click', () => {
    is24HourFormat = !is24HourFormat;
    if (is24HourFormat) {
        formatToggle.textContent = '12 Hour Format';
    } else {
        formatToggle.textContent = '24 Hour Format';
    }
    updateDigitalClock();
});

// Initialize clock
updateClock();

// Update clock every second
setInterval(updateClock, 1000);

// Smooth second hand animation (optional enhancement)
function smoothSecondHand() {
    const now = new Date();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
    const secondAngle = (seconds * 6) + (milliseconds * 0.006);
    secondHand.style.transform = `rotate(${secondAngle}deg)`;
    requestAnimationFrame(smoothSecondHand);
}

// Uncomment the line below for ultra-smooth second hand animation
// smoothSecondHand();
