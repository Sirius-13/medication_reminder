<?php
session_start();

$validUsername = "user123";
$validPassword = "password123";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['username']) && isset($_POST['password'])) {
        $enteredUsername = $_POST['username'];
        $enteredPassword = $_POST['password'];

        if ($enteredUsername === $validUsername && $enteredPassword === $validPassword) {
            // Set a session variable to indicate the user is logged in (replace with actual session handling)
            $_SESSION['username'] = $enteredUsername;
            
            // Redirect to a welcome or dashboard page upon successful login
            header("Location: welcome.php");
            exit();
        } else {
            echo "Invalid username or password. Please try again.";
        }
    } else {
        echo "Please enter both username and password.";
    }
}
?>