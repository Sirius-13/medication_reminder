$(document).ready(function () {
    $.ajax({
        url: '../backend/retrieveMedicineInfo.php',
        method: 'GET',
        success: function (response) {
            // console.log(response);

            if (Array.isArray(response) && response.length > 0) {
                var medicineContainer = $('#medicineContainer');

                response.forEach(function (medicine) {
                    // Create a new row for each medicine
                    var newRow = $('<div class="col-md-6 mb-3">' +
                        '<div class="card">' +
                        '<div class="card-body">' +
                        '<p class="card-title fs-4 fw-bold medicine-name"></p>' +
                        '<p class="card-text medicine-type"></p>' +
                        '<p class="card-text reminder-time"></p>' +
                        '<p class="card-text date-range"></p>' +
                        '<p class="card-text frequency"></p>' +
                        '</div>' +
                        '</div>' +
                        '</div>');

                    // Set the content of the new row
                    newRow.find('.medicine-name').text(medicine.MedicineName);
                    newRow.find('.medicine-type').text("Type: " + medicine.MedicineType);
                    newRow.find('.reminder-time').text("Reminder Times: " + medicine.ReminderTimes);
                    newRow.find('.date-range').text("Duration: " + medicine.StartDate + ' - ' + medicine.EndDate);
                    newRow.find('.frequency').text("Frequency: " + medicine.Frequency);

                    // Append the new row to the medicineContainer
                    medicineContainer.append(newRow);
                });
            } else {
                $('#medicineContainer').html('No data found');
            }
        },
        error: function () {
            $('#medicineContainer').html('Error loading content.'); // Display error message
        }
    });
});
