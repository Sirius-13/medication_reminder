function formatTimeToHHMM(timeString) {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
}

function createModal(medicineData) {
    var modal = $('#exampleModal1');

    if (modal.length > 0) {
        modal.remove();
    }

    var modal = $(
        '<div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<h1 class="modal-title fs-5" id="exampleModalLabel">Edit Medicine</h1>' +
        '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
        '</div>' +
        '<div class="modal-body">' +
        '<form id="editMedicineInfo">' +
        '<div class="mb-3">' +
        '<label for="medicine-name" class="col-form-label">Medicine Name</label>' +
        '<input type="text" class="form-control" name="medicine-name" id="medicine-name" required>' +
        '</div>' +
        '<div class="mb-3">' +
        '<label for="medicine-type" class="col-form-label">Medicine Type</label>' +
        '<select class="form-select" aria-label=".form-select-sm example" id="medicine-type" name="medicine-type" required>' +
        '<option selected disabled hidden>Please select your medicine type</option>' +
        '<option value="Liquid/Syrup">Liquid/Syrup</option>' +
        '<option value="Tablet">Tablet</option>' +
        '<option value="Capsule">Capsule</option>' +
        '<option value="Lozenges">Lozenges</option>' +
        '<option value="Spray">Spray</option>' +
        '<option value="Drop">Drop</option>' +
        '<option value="Topical Medicine">Topical Medicine</option>' +
        '</select>' +
        '</div>' +
        '<div class="mb-3">' +
        '<label for="cap-size" class="col-form-label">Cap Size</label>' +
        '<input type="text" class="form-control" name="cap-size" id="cap-size" required>' +
        '</div>' +
        '<div class="mb-3">' +
        '<label for="frequency" class="col-form-label">Frequency</label>' +
        '<select class="form-select" aria-label=".form-select-sm example" id="frequency" name="frequency" required>' +
        '<option selected disabled hidden>Please select your frequency</option>' +
        '<option value="Everyday">Everyday</option>' +
        '<option value="Custom">Custom</option>' +
        '</select>' +
        '<div id="customReminderSelections" name="customReminderSelections" class="mb-3 border p-2 d-none">' +
        '<div class="row">' +
        '<div class="col">' +
        '<input type="checkbox" id="option1" name="sunday" value="sunday">' +
        '<label for="option1">Sunday</label>' +
        '</div>' +
        '<div class="col">' +
        '<input type="checkbox" id="option2" name="monday" value="monday">' +
        '<label for="option2">Monday</label><br>' +
        '</div>' +
        '<div class="col">' +
        '<input type="checkbox" id="option3" name="tuesday" value="tuesday">' +
        '<label for="option3">Tuesday</label><br>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="col">' +
        '<input type="checkbox" id="option4" name="wednesday" value="wednesday">' +
        '<label for="option4">Wednesday</label>' +
        '</div>' +
        '<div class="col">' +
        '<input type="checkbox" id="option5" name="thursday" value="thursday">' +
        '<label for="option5">Thursday</label>' +
        '</div>' +
        '<div class="col">' +
        '<input type="checkbox" id="option6" name="friday" value="friday">' +
        '<label for="option6">Friday</label>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="col">' +
        '<input type="checkbox" id="option7" name="saturday" value="saturday">' +
        '<label for="option7">Saturday</label>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="col mb-3">' +
        '<label for="start-date" class="col-form-label">Start Date</label>' +
        '<input type="date" class="form-control" id="start-date" name="start-date" required>' +
        '</div>' +
        '<div class="col mb-3">' +
        '<label for="end-date" class="col-form-label">End Date</label>' +
        '<input type="date" class="form-control" id="end-date" name="end-date" required>' +
        '</div>' +
        '</div>' +
        '<div class="mb-3">' +
        '<label for="time-and-schedule" class="col-form-label">Reminder Times</label>' +
        '<input type="time" class="form-control" id="reminder-times" name="reminder-times">' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>' +
        '<button type="submit" class="btn btn-primary updateBtn">Update Medicine</button>' +
        '</div>' +
        '</form>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>');

    if (medicineData) {
        modal.find('#medicine-name').val(medicineData.MedicineName);
        modal.find('#medicine-type').val(medicineData.MedicineType);
        modal.find('#cap-size').val(medicineData.CapSize);
        modal.find('#frequency').val(medicineData.Frequency);
        modal.find('#start-date').val(medicineData.StartDate);
        modal.find('#end-date').val(medicineData.EndDate);
        modal.find('#reminder-times').val(medicineData.ReminderTimes);
        modal.find('#customReminderSelections').val(medicineData.CustomReminderTimes);

        var customReminderTimes = medicineData.CustomReminderTimes;
        var customReminderTimesArray = JSON.parse(customReminderTimes);
        var customReminderSelections = modal.find('#customReminderSelections');

        if (customReminderTimes.length > 0) {
            customReminderSelections.removeClass('d-none');

            customReminderTimesArray.forEach(function (day) {
                // console.log("Setting checkbox for day:", day);
                modal.find('input[name="' + day + '"]').prop('checked', true);
            });
        } else {
            console.log("No custom reminder times specified.");
        }
    }

    var frequency = modal.find('#frequency');
    var customReminderSelections = modal.find('#customReminderSelections');

    frequency.on('change', function () {
        var selectedOption = $(this).val();
        toggleCustomReminderSelections(selectedOption);
    });

    function toggleCustomReminderSelections(selectedOption) {
        if (selectedOption === 'Custom') {
            customReminderSelections.removeClass('d-none');
        } else {
            customReminderSelections.addClass('d-none');
        }
    }

    toggleCustomReminderSelections(modal.find('#frequency').val());

    if (medicineData && medicineData.CustomReminderTimes && Array.isArray(medicineData.CustomReminderTimes)) {
        medicineData.CustomReminderTimes.forEach(function (day) {
            modal.find('input[name="' + day + '"]').prop('checked', true);
        });
    }

    var updateButton = modal.find('.updateBtn');

    updateButton.on('click', function () {
        $.ajax({
            url: '../backend/updateMedicineInfo.php',
            method: 'POST',
            data: {
                medicineName: modal.find('#medicine-name').val(),
                medicineType: modal.find('#medicine-type').val(),
                capSize: modal.find('#cap-size').val(),
                frequency: modal.find('#frequency').val(),
                startDate: modal.find('#start-date').val(),
                endDate: modal.find('#end-date').val(),
                reminderTimes: modal.find('#reminder-times').val(),
                customReminderSelections: modal.find('#customReminderSelections').val(),
                MedID: medicineData.MedicineID
            },
            success: function (response) {
                console.log('Medicine updated successfully');
            },
            error: function (error) {
                console.error('Error updating medicine:', error);
            }
        });
    });

    $('body').append(modal);
}

$(document).ready(function () {
    $('#openModalBtn').on('click', function () {
        createModal();
        modal.modal('show');
    });
});

$(document).ready(function () {
    $.ajax({
        url: '../backend/retrieveMedicineInfo.php',
        method: 'GET',
        success: function (response) {
            // console.log(response);

            if (Array.isArray(response) && response.length > 0) {
                var medicineContainer = $('#medicineContainer');

                response.forEach(function (medicine) {

                    var newRow = $('<div class="col-md-6 mt-2 mb-2">' +
                        '<div class="card">' +
                        '<div class="card-body">' +
                        '<div class="d-flex justify-content-between">' +
                        '<div class="col-md-6">' +
                        '<div class="card-title fs-4 fw-bold medicine-name"></div>' +
                        '</div>' +

                        '<div class="col-md-3 text-end">' +
                        '<div class="dropdown">' +
                        '<button class="border-0 bg-transparent align-baseline" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">' +
                        '<i class="fas fa-ellipsis-v"></i>' +
                        '</button>' +
                        '<ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">' +
                        '<li><a class="dropdown-item edit-btn" href="#">Edit</a></li>' +
                        '<li><a class="dropdown-item remove-btn" href="#">Remove</a></li>' +
                        '</ul>' +
                        '</div>' +
                        '</div>' +

                        '</div>' +
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

                    var editButton = newRow.find('.edit-btn');
                    var removeButton = newRow.find('.remove-btn');

                    editButton.on('click', function () {
                        createModal(medicine);
                        $('#exampleModal1').modal('show');
                    });

                    removeButton.on('click', function () {
                        $.ajax({
                            url: '../backend/removeMedicineInfo.php',
                            method: 'POST',
                            data: { MedID: medicine.MedicineID },
                            success: function (response) {
                                console.log('Medicine deleted successfully');
                                newRow.remove();
                            },
                            error: function (error) {
                                console.error('Error deleting medicine:', error);
                            }
                        });
                    });
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