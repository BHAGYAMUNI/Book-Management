<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once("../config/db.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $book_id = $_POST['book_id'];
    $title = $_POST['title'];
    $author_name = $_POST['author_name'];
    $genre = $_POST['genre'];

    // Basic validation
    if (empty($title) || empty($author_name) || empty($genre)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
        exit;
    }

    // Update without description
    $sql = "UPDATE books SET title = ?, author_name = ?, genre = ? WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    if ($stmt->execute([$title, $author_name, $genre, $book_id])) {
        echo json_encode(['status' => 'success', 'message' => 'Book updated successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update book.']);
    }
}
?>
