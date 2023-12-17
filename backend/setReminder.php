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

    $medicineName = $_POST['medicine-name'];
    $medicineType = $_POST['medicine-type'];
    $capSize = $_POST['cap-size'];
    $reminderTimes = $_POST['reminder-times'];
    $startDate = $_POST['start-date'];
    $endDate = $_POST['end-date'];
    $frequency = $_POST['frequency'];

    $selectedDays = array();
    $daysOfWeek = array("sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday");
    
    foreach ($daysOfWeek as $day) {
        if (isset($_POST[$day])) {
            $selectedDays[] = $_POST[$day];
        }
    }

    if (isset($_POST['customReminderSelections'])) {
        $customReminderSelections = $_POST['customReminderSelections'];
        $selectedDays[] = $customReminderSelections;
    }
    $selectedDaysJSON = json_encode($selectedDays);

    $sql = "INSERT INTO medicine_details (MedicineID, Email, MedicineName, MedicineType, CapSize, ReminderTimes, StartDate, EndDate, Frequency, CustomReminderTimes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssssss", $medicineID, $user_email, $medicineName, $medicineType, $capSize, $reminderTimes, $startDate, $endDate, $frequency, $selectedDaysJSON);

    if ($stmt->execute()) {
        echo "New record created successfully";
        echo "<script>
                    window.location.href = '../frontend/dashboard_3.html';
                </script>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $stmt->close();
}

$conn->close();
exit();
?>