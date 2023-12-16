document.addEventListener('DOMContentLoaded', function () {
    // Function to retrieve medication details
    function fetchMedicationDetails() {
        // Use AJAX to fetch data from the PHP script
        $.ajax({
            url: '../backend/retrieveMedicineInfo.php',
            method: 'GET',
            success: function (response) {
                handleMedicationDetails(response);
            },
            error: function () {
                console.error('Error fetching medication details.');
            }
        });
    }

    function handleMedicationDetails(data) {

        data.forEach(function (medication) {
            var reminderTimes = medication.ReminderTimes.split(',');

            reminderTimes.forEach(function (time) {
                var notificationTime = new Date(medication.StartDate + ' ' + time);

                if (notificationTime > new Date()) {
                    setTimeout(function () {
                        showNotification('Medication Reminder', medication.MedicineName + ' - Time to take your medication!');
                    }, notificationTime - new Date());
                }
            });
        });
    }

    function showNotification(title, body) {
        if (Notification.permission === 'granted') {
            var notification = new Notification(title, { body: body });

            notification.onclick = function () {
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