
const reminderForm = document.getElementById('reminderForm');
const reminderList = document.getElementById('reminderList');
const chime = document.getElementById('chime');

let reminders = [];

reminderForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const day = parseInt(document.getElementById('day').value);
    const time = document.getElementById('time').value;
    const activity = document.getElementById('activity').value;

    const [hour, minute] = time.split(':').map(Number);

    const reminder = {
        day,
        hour,
        minute,
        activity
    };

    reminders.push(reminder);
    displayReminders();
});

function displayReminders() {
    reminderList.innerHTML = '';

    reminders.forEach((reminder, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${getDayName(reminder.day)} at ${formatTime(reminder.hour, reminder.minute)} - ${reminder.activity}</span>
            <button onclick="removeReminder(${index})">Remove</button>
        `;
        reminderList.appendChild(listItem);
    });
}

function getDayName(day) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
}

function formatTime(hour, minute) {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

function removeReminder(index) {
    reminders.splice(index, 1);
    displayReminders();
}

function checkReminders() {
    const now = new Date();

    reminders.forEach((reminder, index) => {
        if (now.getDay() === reminder.day &&
            now.getHours() === reminder.hour &&
            now.getMinutes() === reminder.minute) {
            playChime(reminder.activity);
            reminders.splice(index, 1);
            displayReminders();
        }
    });
}

function playChime(activity) {
    // chime.play();
    let audio = new Audio('twirling-intime-lenovo-k8-note-alarm-tone-41440.mp3');
    audio.play().then(()=>{
        alert(`Time for: ${activity}`);
        audio.pause();
    });
}

setInterval(checkReminders, 1000);
