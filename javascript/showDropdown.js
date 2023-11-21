function showDropdown() {
    let dashboardOptions = document.querySelectorAll('.dashboardOption');

    dashboardOptions.forEach(option => {
        if (option.style.display === 'block') {
            option.style.display = 'none';
        } else {
            option.style.display = 'block';
            option.style.setProperty('display', 'block', 'important');
        }
    });
}
