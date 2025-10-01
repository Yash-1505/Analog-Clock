function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const hourAngle = (hours * 30) + (minutes * 0.5);
    const minuteAngle = minutes * 6;
    const secondAngle = seconds * 6;
    const hourHand = document.getElementById('hour-hand');
    const minuteHand = document.getElementById('minute-hand');
    const secondHand = document.getElementById('second-hand');
    hourHand.style.transform = `rotate(${hourAngle}deg)`;
    minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
    secondHand.style.transform = `rotate(${secondAngle}deg)`;
    updateDigitalTime();
}
function updateDigitalTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('digital-time').textContent = timeString;
}
function startClock() {
    updateClock();
    setInterval(updateClock, 1000);
}
function handleResize() {
    updateClock();
}
function checkReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--transition-duration', '0s');
    }
}
document.addEventListener('DOMContentLoaded', function() {
    startClock();
    checkReducedMotion();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', function() {
        setTimeout(handleResize, 100);
    });
});
let is24Hour = false;
function toggleTimeFormat() {
    is24Hour = !is24Hour;
    updateDigitalTime();
}
function updateDigitalTime() {
    const now = new Date();
    let timeString;
    if (is24Hour) {
        timeString = now.toLocaleTimeString('en-GB', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    } else {
        timeString = now.toLocaleTimeString('en-US', {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
    document.getElementById('digital-time').textContent = timeString;
}
document.addEventListener('DOMContentLoaded', function() {
    const digitalTime = document.getElementById('digital-time');
    digitalTime.addEventListener('click', toggleTimeFormat);
    digitalTime.style.cursor = 'pointer';
    digitalTime.title = 'Click to toggle 12/24 hour format';
});
