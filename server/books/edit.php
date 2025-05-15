<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

include_once("../config/db.php");

// Example: start session if you store user_id in session
// session_start();
// $user_id = $_SESSION['user_id'] ?? null;

// Or get from POST (but frontend must send it securely)
$user_id = $_POST['user_id'] ?? null;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Check if user_id is provided
    if (!$user_id) {
        echo json_encode(['status' => 'error', 'message' => 'User not authenticated']);
        exit;
    }

    $book_id = $_POST['book_id'] ?? null;
    $title = trim($_POST['title'] ?? '');
    $author_name = trim($_POST['author_name'] ?? '');
    $genre = trim($_POST['genre'] ?? '');
    $description = trim($_POST['description'] ?? '');

    // Basic server-side validation
    if (!$book_id || strlen($title) < 2 || strlen($author_name) < 2 || strlen($genre) < 2) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid input data']);
        exit;
    }

    // Ownership check
    $stmt = $pdo->prepare("SELECT id FROM books WHERE id = ? AND added_by = ?");
    $stmt->execute([$book_id, $user_id]);

    if ($stmt->rowCount() === 0) {
        echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
        exit;
    }

    // Update book record
    $sql = "UPDATE books SET title = ?, author_name = ?, genre = ?, description = ? WHERE id = ?";
    $stmt = $pdo->prepare($sql);

    if ($stmt->execute([$title, $author_name, $genre, $description, $book_id])) {
        echo json_encode(['status' => 'success', 'message' => 'Book updated successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update book']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
