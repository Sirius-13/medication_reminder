document.addEventListener('DOMContentLoaded', function () {
    var clockElement = document.getElementById('clock');

    function clock() {
        var date = new Date();
        var utcString = date.toUTCString();

        var parts = utcString.split(' ');
        var filteredParts = parts.filter(part => part !== 'GMT');

        var filteredString = filteredParts.join(' ');

        clockElement.textContent = filteredString;
    }
    setInterval(clock, 1000);
});