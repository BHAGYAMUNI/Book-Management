<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include_once("../config/db.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Read JSON input
    $data = json_decode(file_get_contents("php://input"), true);

    $title = trim($data['title'] ?? '');
    $author_name = trim($data['author_name'] ?? '');
    $genre = trim($data['genre'] ?? '');
    $description = trim($data['description'] ?? '');
    $user_id = $data['user_id'] ?? null;

    // Validation
    if (
        empty($title) || strlen($title) < 2 || strlen($title) > 255 ||
        empty($author_name) || strlen($author_name) < 2 || strlen($author_name) > 255 ||
        empty($genre) || strlen($genre) < 2 || strlen($genre) > 100 ||
        empty($description) || strlen($description) < 5 ||
        empty($user_id)
    ) {
        echo json_encode(['status' => 'error', 'message' => 'Please provide valid book details.']);
        exit;
    }

    // Insert into database
    $sql = "INSERT INTO books (title, author_name, genre, description, added_by) VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);

    if ($stmt->execute([$title, $author_name, $genre, $description, $user_id])) {
        echo json_encode(['status' => 'success', 'message' => 'Book added successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to add book.']);
    }
}
?>
