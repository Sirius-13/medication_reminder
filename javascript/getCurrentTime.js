document.addEventListener('DOMContentLoaded', function () {
    var clockElement = document.getElementById('clock');

    function clock() {
        var date = new Date();
        var utcString = date.toUTCString();

        // Splitting the UTC string to remove 'GMT'
        var parts = utcString.split(' ');
        var filteredParts = parts.filter(part => part !== 'GMT');

        // Reconstructing the string without 'GMT'
        var filteredString = filteredParts.join(' ');

        clockElement.textContent = filteredString;
    }

    setInterval(clock, 1000);
});