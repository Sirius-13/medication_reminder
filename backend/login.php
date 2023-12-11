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
    if (isset($_POST['email']) && isset($_POST['password'])) {
        $email = $_POST['email'];
        $password = $_POST['password'];

        $sql = "SELECT Username, PasswordHash FROM users WHERE Email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $hashedPassword = $row['PasswordHash'];

            if (password_verify($password, $hashedPassword)) {
                $token = bin2hex(random_bytes(32));
                $_SESSION['token'] = $token;
                $_SESSION['email'] = $email;
                $username = $row['Username'];

                $updateTimestampSQL = "UPDATE users SET LastLoginDate = CURRENT_TIMESTAMP WHERE Email = ?";
                $stmt = $conn->prepare($updateTimestampSQL);
                $stmt->bind_param("s", $email);
                $stmt->execute();

                echo "<script>
                    sessionStorage.setItem('token', '$token');
                    sessionStorage.setItem('email', '$email');
                    sessionStorage.setItem('username', '$username');
                    window.location.href = '../frontend/dashboard_1.html';
                </script>";
            } else {
                echo "<script>
                    alert('Invalid username or password. Please try again.');
                    window.location.href = '../frontend/index.html';
                </script>";
            }
        } else {
            echo "<script>
                alert('Invalid username or password. Please try again.');
                window.location.href = '../frontend/index.html';
            </script>";
        }
    }
}

$conn->close();
?>