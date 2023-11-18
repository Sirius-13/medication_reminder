function logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('username');

    window.location.href = '../frontend/index.html';
}

