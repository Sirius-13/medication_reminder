let passwordInput = document.getElementsByName("password"),
    toggle = document.getElementById("btnToggle"),
    icon = document.getElementById("eyeIcon");

console.log(passwordInput);

function togglePassword() {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        icon.classList.remove("fa-eye-slash");
    }
}