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
        } else if (isDashboard3) {
            window.location.href = '../frontend/dashboard_3.html?redirect=true';
        } else {
            window.location.href = '../frontend/profile.html?redirect=true';
        }
    } else if (!token) {
        console.log("hahaha");
        window.location.href = '../frontend/index.html?redirect=true';
    }
});

// For testing uses only
// document.addEventListener("DOMContentLoaded", function () {
//     const token = sessionStorage.getItem('token');
//     const currentPath = window.location.pathname;
//     const isDashboard = currentPath.includes('dashboard_1.html');
//     const isDashboard2 = currentPath.includes('dashboard_2.html');
//     const isDashboard3 = currentPath.includes('dashboard_3.html');
//     const isProfile = currentPath.includes('profile.html');
//     const shouldRedirectToDashboard = window.location.search.includes('redirect=true');

//     console.log("Token:", token);
//     console.log("Current Path:", currentPath);
//     console.log("Is Dashboard:", isDashboard);
//     console.log("Is Dashboard2:", isDashboard2);
//     console.log("Is Dashboard3:", isDashboard3);
//     console.log("Is Profile:", isProfile);
//     console.log("Should Redirect:", shouldRedirectToDashboard);
// });
