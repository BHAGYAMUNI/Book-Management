<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include_once("../config/db.php");

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = 5;
$offset = ($page - 1) * $limit;

$allowedSort = ['title', 'author_name', 'genre'];
$sortBy = in_array($_GET['sortBy'] ?? 'title', $allowedSort) ? $_GET['sortBy'] : 'title';
$sortOrder = ($_GET['sortOrder'] ?? 'asc') === 'desc' ? 'DESC' : 'ASC';

$totalStmt = $pdo->query("SELECT COUNT(*) as total FROM books");
$totalRow = $totalStmt->fetch();
$totalBooks = $totalRow['total'];
$totalPages = ceil($totalBooks / $limit);

$stmt = $pdo->prepare("SELECT * FROM books ORDER BY $sortBy $sortOrder LIMIT :limit OFFSET :offset");
$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();
$books = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    'books' => $books,
    'totalPages' => $totalPages,
    'currentPage' => $page,
    'totalBooks' => $totalBooks
]);
?>
