document.addEventListener('DOMContentLoaded', function () {
    // Get the current day index (0 for Sunday, 1 for Monday, ... 6 for Saturday)
    var currentDayIndex = new Date().getDay();

    // Array of tab IDs corresponding to days
    var tabIDs = ['sunTab', 'monTab', 'tueTab', 'wedTab', 'thuTab', 'friTab', 'satTab'];

    // Hide all tab contents by default
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Show the tab corresponding to the current day
    var currentTab = document.getElementById(tabIDs[currentDayIndex]);
    if (currentTab) {
        currentTab.click(); // Trigger a click event on the current day's tab
    }
});

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}