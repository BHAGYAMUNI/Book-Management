<?php
// Ensure output is JSON only
header('Content-Type: application/json');

// Include DB
include_once("../config/db.php");

// Error reporting for debugging (only log, not display)
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

// CORS Headers
if (isset($_SERVER['HTTP_ORIGIN'])) {
    $allowed_origins = ['http://localhost:3000', 'http://localhost:3001'];
    if (in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
        header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    } else {
        header("Access-Control-Allow-Origin: *");
    }
} else {
    header("Access-Control-Allow-Origin: *");
}
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Check DB connection
try {
    $pdo->query("SELECT 1");
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database connection failed."]);
    exit;
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Defensive check for invalid JSON
    if (!is_array($data)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid JSON format."]);
        exit;
    }

    $first_name = trim($data['firstname'] ?? '');
    $last_name  = trim($data['lastname'] ?? '');
    $email      = trim($data['email'] ?? '');
    $phone      = trim($data['phone'] ?? '');
    $password   = trim($data['password'] ?? '');

    // Validations
    if (strlen($first_name) < 3) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "First name must be at least 3 characters long."]);
        exit;
    }

    if (strlen($last_name) < 3) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Last name must be at least 3 characters long."]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strpos($email, '@gmail.com') === false) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Please enter a valid Gmail address."]);
        exit;
    }

    if (!preg_match("/^\+\d{1,4}-\d{10}$/", $phone)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Phone number must include country code and exactly 10 digits (e.g., +91-9876543210)."]);
        exit;
    }

    if (strlen($password) < 8 || 
        !preg_match("/[A-Z]/", $password) || 
        !preg_match("/[0-9]/", $password) || 
        !preg_match("/[\W_]/", $password)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Password must be at least 8 characters with uppercase, number, and special character."]);
        exit;
    }

    // Check existing email
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->rowCount() > 0) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Email is already registered."]);
        exit;
    }

    // Insert user
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    try {
        $sql = "INSERT INTO users (first_name, last_name, email, phone, password) VALUES (?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$first_name, $last_name, $email, $phone, $hashed_password]);

        $user_id = $pdo->lastInsertId(); // ✅ Capture user ID

        // [Optional] Skip mail() in dev environment
        /*
        $to = $email;
        $subject = "Registration Confirmation";
        $message = "Hello $first_name $last_name,\n\nThank you for registering!";
        $headers = "From: noreply@yourdomain.com\r\n";
        mail($to, $subject, $message, $headers);
        */

        // ✅ Include user_id in response
        echo json_encode([
            "status" => "success",
            "message" => "Registration successful!",
            "user_id" => $user_id,
            "user_name" => "$first_name $last_name"
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Database error occurred."]);
    }
}
?>
