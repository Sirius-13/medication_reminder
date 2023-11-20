document.addEventListener('DOMContentLoaded', function () {

    var username = sessionStorage.getItem('username');
    var email = sessionStorage.getItem('email');

    var username1 = document.getElementById('username');
    var profile_edit_username = document.getElementById('username_profile_edit');
    var profile_edit_email = document.getElementById('email_profile_edit');

    if (username && email) {
        username1.textContent = username;
        profile_edit_username.value = username;
        profile_edit_email.value = email;
    }
});
