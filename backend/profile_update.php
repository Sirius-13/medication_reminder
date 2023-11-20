<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$database = "medication_reminder";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user_email = $_SESSION['email'];

    $username = $_POST['username_profile_edit'];
    $email = $_POST['email_profile_edit'];
    $password = $_POST['password_profile_edit'];
    $confirm_password = $_POST['confirm_password_profile_edit'];

    $sql = "UPDATE users SET ";

    if (!empty($username)) {
        $sql .= "Username = '$username', ";
    }

    if (!empty($email)) {
        $sql .= "Email = '$email', ";
    }

    if (!empty($password) && !empty($confirm_password) && $password === $confirm_password) {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $sql .= "PasswordHash = '$hashedPassword', ";
    }

    $sql = rtrim($sql, ', ');
    $sql .= " WHERE Email = '$user_email'";

    $result = $conn->query($sql);

    if ($result) {
        echo "Update successful!";
        // Update session storage values after successful update
        if (!empty($username)) {
            echo "<script>
            sessionStorage.setItem('updateSuccess', 'true');
            sessionStorage.setItem('username', '$username');
            </script>";
        }
        if (!empty($email)) {
            echo "<script>
            sessionStorage.setItem('updateSuccess', 'true');
            sessionStorage.setItem('email', '$email');
            </script>";
        }
        if(!empty($password) && !empty($confirm_password)) {
            echo "<script>
            sessionStorage.setItem('updateSuccess', 'true');
            </script>";
        }
        // Redirect to profile page
        echo "<script>
            window.location.href = '../frontend/profile.html';
        </script>";
    } else {
        echo "Error updating record: " . $conn->error;
    }
}
?>