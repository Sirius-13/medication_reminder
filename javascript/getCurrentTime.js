document.addEventListener('DOMContentLoaded', function () {
    var clockElement = document.getElementById('clock');

    function clock() {
        var date = new Date();
        var localTimeString = date.toLocaleString();

        clockElement.textContent = localTimeString;
    }
    setInterval(clock, 1000);
});