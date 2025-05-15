<?php
// Include the database connection file
include_once("../config/db.php");

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Enable CORS dynamically
if (isset($_SERVER['HTTP_ORIGIN'])) {
    $allowed_origins = ['http://localhost:3000', 'http://localhost:3001']; // Add your frontend origins here
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

// Handle preflight request (OPTIONS request)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Test database connection
try {
    $pdo->query("SELECT 1");
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database connection failed: " . $e->getMessage()]);
    exit;
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate and collect form data
    $first_name = trim($data['firstname'] ?? '');
    $last_name = trim($data['lastname'] ?? '');
    $email = trim($data['email'] ?? '');
    $phone = trim($data['phone'] ?? '');
    $password = trim($data['password'] ?? '');

    // Validation
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

    if (!preg_match("/^\+\d{1,4}-\d{7,15}$/", $phone)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Phone number must include a country code and only numbers (e.g., +91-9876543210)."]);
        exit;
    }

    if (strlen($password) < 8 || !preg_match("/[A-Z]/", $password) || !preg_match("/[0-9]/", $password) || !preg_match("/[\W_]/", $password)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character."]);
        exit;
    }

    // Check if email already exists
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->rowCount() > 0) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Email is already registered."]);
        exit;
    }

    // Hash password and insert
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    try {
        $sql = "INSERT INTO users (first_name, last_name, email, phone, password) VALUES (?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$first_name, $last_name, $email, $phone, $hashed_password]);

        http_response_code(200);
        echo json_encode([
            "status" => "success",
            "message" => "Registration successful!",
            "user_name" => $first_name . " " . $last_name
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
    }
}
?>
