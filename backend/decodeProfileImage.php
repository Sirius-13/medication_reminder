<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$database = "medication_reminder";

$email = $_SESSION['email'];

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT profile_img FROM users WHERE Email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $imageData = $row['profile_img'];

    if ($imageData) {
        header("Content-type: image/jpeg");
        echo $imageData;
        exit();
    }
} 

$default_profile_img = "../assets/image/defaultProfileImg.jpg";
header("Content-type: image/jpeg");
readfile($default_profile_img);

$conn->close();
exit();
?>