<?php
session_start();

$servername = "localhost"; 
$username = "root";
$password = "";
$database = "medication_reminder";

$conn = new mysqli($servername, $username, $password, $database);

/*
This code is used to check the database connectivity

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Connected successfully";
}
*/

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    $sql = "INSERT INTO users (UserID ,Username, Email, PasswordHash) VALUES ('' ,'$name', '$email', '$hashedPassword')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
header("Location: ../frontend/dashboard.html");
exit();
?>
