document.addEventListener("DOMContentLoaded", function () {
    const token = sessionStorage.getItem('token');
    const isDashboard = window.location.pathname.includes('dashboard.html');
    const shouldRedirectToDashboard = window.location.search.includes('redirect=true');

    if (token && !isDashboard && !shouldRedirectToDashboard) {
        window.location.href = '../frontend/dashboard.html?redirect=true';
    } else if (!token && isDashboard && !shouldRedirectToDashboard) {
        window.location.href = '../frontend/index.html?redirect=true';
    }
});
