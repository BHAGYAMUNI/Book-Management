<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

include_once("../config/db.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $title = $_POST['title'];
    $author_name = $_POST['author_name'];
    $genre = $_POST['genre'];
    $description = $_POST['description'];

    if (empty($title) || empty($author_name) || empty($genre)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
        exit;
    }

    // Insert into database without user_id
    $sql = "INSERT INTO books (title, author_name, genre, description) VALUES (?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    if ($stmt->execute([$title, $author_name, $genre, $description])) {
        echo json_encode(['status' => 'success', 'message' => 'Book added successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to add book.']);
    }
}
?>
