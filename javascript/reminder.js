document.addEventListener('DOMContentLoaded', function () {
    function fetchMedicationDetails() {
        $.ajax({
            url: '../backend/retrieveMedicineInfo.php',
            method: 'GET',
            success: function (response) {
                if (Array.isArray(response) && response.length > 0) {
                    handleMedicationDetails(response);
                    console.log(response);
                } else {
                    console.log('No medication data available.');
                }
            },
            error: function () {
                console.error('Error fetching medication details.');
            }
        });
    }

    function handleMedicationDetails(data) {
        data.forEach(function (medication) {
            var frequency = medication.Frequency;
            var reminderTimes = medication.ReminderTimes.split(',');

            if (frequency === 'Once' || frequency === 'Everyday') {

                reminderTimes.forEach(function (time) {
                    var notificationTime = new Date(medication.StartDate + ' ' + time);
                    console.log(reminderTimes)

                    if (notificationTime > new Date()) {
                        console.log('still working')
                    } else {
                        console.log('not working')
                    }

                    if (notificationTime > new Date()) {
                        setTimeout(function () {
                            showNotification('Medication Reminder', medication.MedicineName + ' - Time to take your medication!');
                        }, notificationTime - new Date());
                    }
                });
            }

            if (frequency === 'Custom') {
                var selectedDays = JSON.parse(medication.CustomReminderTimes);
                var currentDate = new Date();
                var currentDay = currentDate.getDay();

                console.log(selectedDays);
                console.log(currentDay);

                var dayMap = {
                    'sunday': 0,
                    'monday': 1,
                    'tuesday': 2,
                    'wednesday': 3,
                    'thursday': 4,
                    'friday': 5,
                    'saturday': 6
                };

                var notifications = [];

                reminderTimes.forEach(function (time) {
                    selectedDays.forEach(function (selectedDay) {
                        var jsDay = dayMap[selectedDay.toLowerCase()];
                        var dayOffset = (jsDay - currentDay + 7) % 7;

                        var notificationTime = new Date();
                        notificationTime.setDate(currentDate.getDate() + dayOffset);
                        var hours = parseInt(time.split(':')[0]);
                        var minutes = parseInt(time.split(':')[1]);

                        notificationTime.setHours(hours);
                        notificationTime.setMinutes(minutes);

                        console.log(reminderTimes);
                        console.log(notificationTime);

                        if (notificationTime > new Date()) {
                            notifications.push({
                                time: notificationTime,
                                medicationName: medication.MedicineName
                            });
                        }
                    });
                });

                notifications.forEach(function (notification) {
                    setTimeout(function () {
                        showNotification('Medication Reminder', notification.medicationName + ' - Time to take your medication!');
                    }, notification.time - new Date());
                });
            }
        });
    }

    function showNotification(title, body) {
        if (Notification.permission === 'granted') {
            var notification = new Notification(title, { body: body });

            notification.onclick = function () {
                // Handle click action if needed
            };
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(function (permission) {
                if (permission === 'granted') {
                    showNotification(title, body);
                }
            });
        }
    }

    if (!('Notification' in window)) {
        console.log('This browser does not support notifications.');
    } else {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
        fetchMedicationDetails();
    }
});