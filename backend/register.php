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
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Check if the email already exists
    $checkEmailQuery = "SELECT COUNT(*) as count FROM users WHERE Email = '$email'";
    $result = $conn->query($checkEmailQuery);
    $count = $result->fetch_assoc()['count'];

    if ($count > 0) {
        // Email already exists, inform the user and redirect back to registration
        echo "<script>
            alert('The email you provided has already been used. Please try again.');
            window.location.href = '../frontend/register.html';
        </script>";
        exit();
    }

    if($password == $confirm_password) {

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $sql = "INSERT INTO users (UserID ,Username, Email, PasswordHash) VALUES ('' ,'$name', '$email', '$hashedPassword')";

        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
            
            $sql1 = "SELECT Username, PasswordHash FROM users WHERE Email = '$email'";
            $result = $conn->query($sql1);

            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $token = bin2hex(random_bytes(32));
                $_SESSION['token'] = $token;
                $_SESSION['email'] = $email;
                $username = $row['Username'];

                $updateTimestampSQL = "UPDATE users SET LastLoginDate = CURRENT_TIMESTAMP WHERE Email = '$email'";
                $conn->query($updateTimestampSQL);
        
                echo "<script>
                    sessionStorage.setItem('token', '$token');
                    sessionStorage.setItem('username', '$username');
                    window.location.href = '../frontend/dashboard_1.html';
                </script>";
            }
        }
        $conn->close();
        exit();
    } else {
        $conn->close();
        header("Location: ../frontend/register.html");
        exit();
    }
}
?>
