document.addEventListener("DOMContentLoaded", function () {
    const token = sessionStorage.getItem('token');
    const currentPath = window.location.pathname;
    const isDashboard = currentPath.includes('dashboard_1.html');
    const isDashboard2 = currentPath.includes('dashboard_2.html');
    const isDashboard3 = currentPath.includes('dashboard_3.html');
    const isDashboardProfile = currentPath.includes('profile.html');
    const shouldRedirectToDashboard = window.location.search.includes('redirect=true');

    if (token && !shouldRedirectToDashboard) {
        if (isDashboard) {
            window.location.href = '../frontend/dashboard_1.html?redirect=true';
        } else if (isDashboard2) {
            window.location.href = '../frontend/dashboard_2.html?redirect=true';
        } else if (isDashboardProfile) {
            window.location.href = '../frontend/profile.html?redirect=true';
        } else {
            window.location.href = '../frontend/dashboard_3.html?redirect=true';
        }
    } else if (!token && (isDashboard || isDashboard2) && shouldRedirectToDashboard) {
        window.location.href = '../frontend/index.html?redirect=true';
    }
});