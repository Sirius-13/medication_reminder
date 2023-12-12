document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('selectFrequency').addEventListener('change', function () {
        var radioSelections = document.getElementById('customReminderSelections');
        var selectedOption = this.value;

        if (selectedOption === '3') {
            radioSelections.classList.remove('d-none')
            radioSelections.style.display = ' block';
        } else {
            radioSelections.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const closeButton = document.querySelector('[data-bs-dismiss="modal"]');
    const form = document.querySelector('form');

    closeButton.addEventListener('click', function () {
        form.reset();
    });
});

