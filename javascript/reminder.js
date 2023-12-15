function scheduleNotifications(medicineData) {
    // Parse the JSON data
    const data = JSON.parse(medicineData);

    // Extract required values
    const days = data;

    // Schedule notifications for each day
    days.forEach((day) => {
        const date = new Date();
        const dayOfWeek = date.getDay(); // Get the current day of the week (0-6)

        // Check if the current day matches the scheduled day
        if (dayOfWeek === getDayNumber(day)) {
            const notification = new Notification('Medication Reminder', {
                body: `Time to take your medication!`,
                icon: 'path_to_icon.png' // Add the path to your notification icon
            });

            // You can add more configurations or actions to the notification
            // notification.onclick = function() { /* Do something on click */ };
        }
    });
}

// Function to convert day name to number (0-6)
function getDayNumber(dayName) {
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return daysOfWeek.indexOf(dayName.toLowerCase());
}

// Call the function with your JSON data
scheduleNotifications('["sunday","wednesday","thursday","saturday"]');