function formatTimeToHHMM(timeString) {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
}

function getCurrentDay() {
    return (new Date()).getDay();
}

$(document).ready(function () {
    function loadData(tabID, dayOfWeek) {
        var tabContent = $('#' + tabID).find('.overview-info');
        tabContent.empty();

        $.ajax({
            url: '../backend/retrieveMedicineInfo.php',
            method: 'GET',
            success: function (response) {
                if (Array.isArray(response) && response.length > 0) {
                    for (i = 0; i < response.length; i++) {
                        var medicine = response[i];
                        var reminderTimes = JSON.parse(medicine.CustomReminderTimes);

                        if (reminderTimes.includes(dayOfWeek)) {
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
        var dayOfWeek = $(this).data('day');

        loadData(tabID, dayOfWeek);
    });

    var currentDay = getCurrentDay();
    $('#' + ['sunTab', 'monTab', 'tueTab', 'wedTab', 'thuTab', 'friTab', 'satTab'][currentDay]).trigger('click');
});