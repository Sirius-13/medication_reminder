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
                    sessionStorage.setItem('username', '$username');
                    window.location.href = '../frontend/dashboard.html';
                </script>";
            }
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
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
