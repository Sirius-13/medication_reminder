<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "medication_reminder";

    $conn = new mysqli($servername, $username, $password, $database);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $email = $_SESSION['email'];
    $MedID = $_POST['MedID'];

    $medicineName = $_POST['medicineName'];
    $medicineType = $_POST['medicineType'];
    $capSize = $_POST['capSize'];
    $frequency = $_POST['frequency'];
    $startDate = $_POST['startDate'];
    $endDate = $_POST['endDate'];
    $reminderTimes = $_POST['reminderTimes'];
    $customReminderTimes = $_POST['customReminderSelections'];

    $sql = "UPDATE medicine_details SET 
            MedicineName = ?, 
            MedicineType = ?, 
            CapSize = ?, 
            Frequency = ?, 
            StartDate = ?, 
            EndDate = ?, 
            ReminderTimes = ?, 
            CustomReminderTimes = ?
            WHERE MedicineID = ? AND Email = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param(
        "ssssssssss", 
        $medicineName, 
        $medicineType, 
        $capSize, 
        $frequency, 
        $startDate, 
        $endDate, 
        $reminderTimes, 
        $customReminderTimes, 
        $MedID, 
        $email
    );

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo "Medicine updated successfully";
        } else {
            echo "No changes made or record not found";
        }
    } else {
        echo "Error updating medicine: " . $conn->error;
    }

    $stmt->close();
}

$conn->close();
exit();
?>