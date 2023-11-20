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

$default_profile_img = "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";
header("Content-type: image/jpeg");
readfile($default_profile_img);

$conn->close();
exit();
?>