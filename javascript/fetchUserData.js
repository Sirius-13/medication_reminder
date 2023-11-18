document.addEventListener('DOMContentLoaded', function () {

    var username = sessionStorage.getItem('username');

    var username1 = document.getElementById('username');

    if (username && username1) {
        username1.textContent = username;
    }
});
