function formatTimeToHHMM(timeString) {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
}

function getCurrentDay() {
    return (new Date()).getDay();
}

$(document).ready(function () {
    function loadData(tabID) {
        var tabContent = $('#' + tabID).find('.overview-info');
        tabContent.empty();

        $.ajax({
            url: '../backend/retrieveMedicineInfo.php',
            method: 'GET',
            success: function (response) {
                if (Array.isArray(response) && response.length > 0) {
                    var tabContent = $('#' + tabID).find('.overview-info');
                    var currentDay = getCurrentDay();
                    var dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][currentDay];

                    response.forEach(function (medicine) {
                        var reminderTimes = JSON.parse(medicine.CustomReminderTimes);

                        for (var i = 0; i < reminderTimes.length; i++) {
                            var reminderDay = reminderTimes[i];

                            if (reminderDay === dayOfWeek) {
                                var newRow = $('<div class="col-md-6">' +
                                    '<div class="timetable-item mt-3 mb-3">' +
                                    '<div class="timetable-item-main">' +
                                    '<div class="med-name fw-bold">' +
                                    '</div>' +
                                    '<div class="med-type mt-1">' +
                                    '</div>' +
                                    '<div class="row mt-1">' +
                                    '<div class="col-md-6">' +
                                    '<div class="med-time">' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="col-md-6">' +
                                    '<div class="med-cap-size">' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>');

                                newRow.find('.med-name').text(medicine.MedicineName);
                                newRow.find('.med-type').text("Type: " + medicine.MedicineType);
                                newRow.find('.med-cap-size').text("Cap Size: " + medicine.CapSize);
                                newRow.find('.med-time').text('Time: ' + formatTimeToHHMM(medicine.ReminderTimes));

                                tabContent.append(newRow);
                            }
                        }
                    });
                } else {
                    $('#' + tabID).html('<div class="text-center fw-bold fs-5 mt-3">No data found</div>');
                }
            },
            error: function () {
                $('#' + tabID).html('<div class="text-center fw-bold fs-5 mt-3">Error loading content</div>');
            }
        });
    }

    $('.tablinks').on('click', function (event) {
        var tabID = $(this).attr('id').replace('Tab', '');
        loadData(tabID);
    });

    var currentDay = getCurrentDay();

    switch (currentDay) {
        case 0:
            $('#sunTab').trigger('click');
            break;
        case 1:
            $('#monTab').trigger('click');
            break;
        case 2:
            $('#tueTab').trigger('click');
            break;
        case 3:
            $('#wedTab').trigger('click');
            break;
        case 4:
            $('#thuTab').trigger('click');
            break;
        case 5:
            $('#friTab').trigger('click');
            break;
        case 6:
            $('#satTab').trigger('click');
            break;
        default:
            break;
    }
});