<?php
// Database configuration
$host = "localhost";  // MySQL host
$user = "root";       // Default MySQL user for XAMPP
$pass = "";           // Default password for XAMPP (empty)
$dbname = "book_db";  // Database name (make sure to create this DB in MySQL)

// PDO connection to MySQL
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  // Error handling mode
} catch(PDOException $e) {
    // If connection fails, display error
    die("Connection failed: " . $e->getMessage());
}
?>
