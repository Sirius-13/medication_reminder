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

$sql = "SELECT * FROM medicine_details WHERE Email = '$email'";
$result = $conn->query($sql);

$displayMedicineInfo = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $displayMedicineInfo[] = $row;
    }

    header('Content-Type: application/json');
    echo json_encode($displayMedicineInfo);
} else {
    echo json_encode(array('message' => 'No medication details found for this user.'));
}

$conn->close();
exit();
?>