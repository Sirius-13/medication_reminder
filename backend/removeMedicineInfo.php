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
    $email = $_SESSION['email'];
    $MedID = $_POST['MedID'];

    $sql = "DELETE FROM medicine_details WHERE MedicineID = ? AND Email = ?";
    
    $stmt = $conn->prepare($sql);

    $stmt->bind_param("ss", $MedID, $email);
    if ($stmt->execute()) {
        echo "Medicine deleted successfully";
    } else {
        echo "Error deleting medicine: " . $conn->error;
    }

    $stmt->close();
}

$conn->close();
exit();
?>