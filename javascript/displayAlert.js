function showAlertDialog() {
    const updateSuccess = sessionStorage.getItem('updateSuccess');

    var alertDialog = document.getElementById('alertDialog');
    var alertMessage = document.getElementById('alertMessage');

    var username = document.getElementByName('username_profile_edit');
    var password = document.getElementsByName('password_profile_edit')[0].value;
    var confirm_password = document.getElementsByName('confirm_password_profile_edit')[0].value;

    if ((username && (!password || !confirm_password))) {
        event.preventDefault();
        alertDialog.style.display = 'block';
        alertMessage.textContent = "Please make sure you have entered password or confirm password.";
    } else if (password !== confirm_password) {
        event.preventDefault();
        alertDialog.style.display = 'block';
        alertMessage.textContent = "Your password and confirm password do not match. Please try again";
    }
    // else if (updateSuccess === 'true') {
    //     // event.preventDefault();
    //     sessionStorage.removeItem(updateSuccess);
    //     alertDialog.style.display = 'block';
    //     alertMessage.textContent = "Your profile edited successfully!";
    // }
}

function closeAlertDialog() {
    document.getElementById('alertDialog').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    var frequencySelect = document.getElementById('frequency');
    var customReminderSection = document.getElementById('customReminderSelections');
    var setReminderForm = document.querySelector('form');

    function validateCheckboxes(event) {
        if (frequencySelect.value === 'Custom') {
            var checkboxes = customReminderSection.querySelectorAll('input[type="checkbox"]');
            var atLeastOneChecked = Array.from(checkboxes).some(function (checkbox) {
                return checkbox.checked;
            });

            if (!atLeastOneChecked) {
                event.preventDefault();
                alert('Please select at least one day.');
            }
        }
    }

    setReminderForm.addEventListener('submit', validateCheckboxes);
});
