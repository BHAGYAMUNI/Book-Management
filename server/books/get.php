<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include_once("../config/db.php");

$user_id = isset($_GET['user_id']) ? (int)$_GET['user_id'] : null;
$allowedSort = ['title', 'author_name', 'genre'];
$sortBy = 'title';

if (isset($_GET['sortBy']) && in_array($_GET['sortBy'], $allowedSort)) {
    $sortBy = $_GET['sortBy'];
}

$sortOrder = 'ASC';
if (isset($_GET['sortOrder']) && strtolower($_GET['sortOrder']) === 'desc') {
    $sortOrder = 'DESC';
}

if ($user_id !== null) {
    // ✅ My Books: Get all books added by specific user (no pagination)
    $stmt = $pdo->prepare("SELECT * FROM books WHERE added_by = :user_id ORDER BY $sortBy $sortOrder");
    $stmt->bindValue(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    $books = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['books' => $books]);
    exit;
}

// ✅ All Books (paginated)
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = 5;
$offset = ($page - 1) * $limit;

// Get total number of books for pagination
$totalStmt = $pdo->query("SELECT COUNT(*) as total FROM books");
$totalRow = $totalStmt->fetch();
$totalBooks = $totalRow['total'];
$totalPages = ceil($totalBooks / $limit);

// Get paginated books
$sql = "SELECT * FROM books ORDER BY $sortBy $sortOrder LIMIT :limit OFFSET :offset";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();

$books = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Output JSON
echo json_encode([
    'books' => $books,
    'totalPages' => $totalPages,
    'currentPage' => $page,
    'totalBooks' => $totalBooks
]);
?>
