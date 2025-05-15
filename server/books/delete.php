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

// Get the book ID and user ID to delete
$data = json_decode(file_get_contents("php://input"), true);
$book_id = $data['book_id'] ?? null;
$user_id = $data['user_id'] ?? null;

if ($book_id && $user_id) {
    // Ownership check
    $stmt = $pdo->prepare("SELECT id FROM books WHERE id = ? AND added_by = ?");
    $stmt->execute([$book_id, $user_id]);
    if ($stmt->rowCount() === 0) {
        echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
        exit;
    }

    // Delete the book
    $sql = "DELETE FROM books WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    if ($stmt->execute([$book_id])) {
        echo json_encode(['status' => 'success', 'message' => 'Book deleted successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to delete book']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Book ID or user ID not provided']);
}
?>
