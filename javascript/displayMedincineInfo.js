function formatTimeToHHMM(timeString) {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
}

$(document).ready(function () {
    $.ajax({
        url: '../backend/retrieveMedicineInfo.php',
        method: 'GET',
        success: function (response) {
            // console.log(response);

            if (Array.isArray(response) && response.length > 0) {
                var medicineContainer = $('#medicineContainer');

                response.forEach(function (medicine) {

                    var newRow = $('<div class="col-md-6 mb-3">' +
                        '<div class="card">' +
                        '<div class="card-body">' +
                        '<div class="card-title fs-4 fw-bold medicine-name"></div>' +
                        '<div class="row mb-1">' +
                        '<div class="col-md-6">' +
                        '<div class="card-text medicine-type"></div>' +
                        '</div>' +
                        '<div class="col-md-6">' +
                        '<div class="card-text cap-size"></div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="row mb-1">' +
                        '<div class="col-md-6">' +
                        '<div class="card-text reminder-time"></div>' +
                        '</div>' +
                        '<div class="col-md-6">' +
                        '<div class="card-text date-range"></div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="card-text frequency"></div>' +
                        '</div>' +
                        '</div>' +
                        '</div>');


                    newRow.find('.medicine-name').text(medicine.MedicineName);
                    newRow.find('.medicine-type').text("Type: " + medicine.MedicineType);
                    newRow.find('.cap-size').text("Cap Size: " + medicine.CapSize);
                    newRow.find('.reminder-time').text("Reminder Times: " + formatTimeToHHMM(medicine.ReminderTimes));
                    newRow.find('.date-range').text("Duration: " + medicine.StartDate + ' - ' + medicine.EndDate);
                    newRow.find('.frequency').text("Frequency: " + medicine.Frequency);

                    medicineContainer.append(newRow);
                });
            } else {
                $('#medicineContainer').html('<div class="text-center fw-bold fs-5 mt-3">No data found</div>');
            }
        },
        error: function () {
            $('#medicineContainer').html('<div class="text-center fw-bold fs-5 mt-3">Error loading content</div>');
        }
    });
});
