<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (isset($_FILES["profile_img"]) && $_FILES["profile_img"]["error"] == 0) {

        session_start();

        $servername = "localhost";
        $username = "root";
        $password = "";
        $database = "medication_reminder";

        $email =  $_SESSION['email'];

        $conn = new mysqli($servername, $username, $password, $database);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $fileData = file_get_contents($_FILES["profile_img"]["tmp_name"]);
        $escapedFileData = $conn->real_escape_string($fileData);

        $sql = "UPDATE users SET profile_img = '$escapedFileData' WHERE Email = '$email'";

        
        if ($conn->query($sql) === TRUE) {
            echo "Image uploaded successfully!";
            echo "<script>
            window.location.href = '../frontend/profile.html';
            </script>";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

        $conn->close();
    }
}
?>
