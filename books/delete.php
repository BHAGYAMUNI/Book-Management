<?php
// Allow requests from the frontend (React app) on localhost:3000
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");  // Allow POST and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type, Authorization");  // Allow headers for the request

// Check if the request is a preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once("../config/db.php");

// Get the book name to delete
$data = json_decode(file_get_contents("php://input"), true); // Read JSON body
if (isset($data['name'])) {
    $book_name = $data['name'];  // Retrieve the name from the JSON body

    // Prepare and execute the delete query
    $sql = "DELETE FROM books WHERE title = :name";  // Using book name (title) to delete
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':name', $book_name, PDO::PARAM_STR);
    
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Book deleted successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to delete book']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Book name not provided']);
}
?>
