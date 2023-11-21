document.addEventListener('DOMContentLoaded', function () {
    const currentPath = window.location.pathname;
    const isDashboardProfile = currentPath.includes('profile.html');

    var username = sessionStorage.getItem('username');
    var email = sessionStorage.getItem('email');

    var username1 = document.getElementById('username');
    var profile_edit_username = document.getElementById('username_profile_edit');
    var profile_edit_email = document.getElementById('email_profile_edit');

    if (username && email && isDashboardProfile) {
        username1.textContent = username;
        profile_edit_username.value = username;
        profile_edit_email.value = email;
    } else if (username && email && !isDashboardProfile) {
        username1.textContent = username;
    }
});
