# 📚 Book Management System

A full-stack web application built with **React.js** (Bootstrap for styling) and **PHP (with MySQL)** to manage user registration, login, and personal book collections with features like pagination, sorting, and responsive design.

---

## 🌟 Features

### 🔐 User Authentication
- **User Registration** with validation:
  - First and Last Name: At least 3 characters
  - Email: Must be a valid Gmail address
  - Phone: Must include country code and contain only numbers
  - Password: Minimum 8 characters, with at least one uppercase letter, one number, and one special character
  - All fields are mandatory
- **Email uniqueness check** with error feedback
- **Confirmation email** sent upon successful registration
- **Login** with email and password
- Error messages for invalid credentials or non-existent users
- Successful login redirects to the **User Dashboard**

### 📘 Book Management
- Authenticated users can:
  - Add books with Title, Genre, and Description
  - Author Name auto-filled from user details
  - View, Edit, and Delete their own books
- All books stored in the `books` table
- View all books added by other users (read-only)
- Table view with:
  - **Pagination**
  - **Sorting** by Title, Author, and Genre
- Field validations for book creation/editing

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Bootstrap (Responsive UI)
- React Router DOM

### Backend
- PHP (RESTful APIs)
- MySQL (Database)

---

## 📂 Database Schema

### `users` Table
| Field        | Type         | Constraints                       |
|--------------|--------------|---------------------------------|
| id           | INT          | PRIMARY KEY, AUTO_INCREMENT      |
| first_name   | VARCHAR(50)  | NOT NULL                        |
| last_name    | VARCHAR(50)  | NOT NULL                        |
| email        | VARCHAR(100) | UNIQUE, NOT NULL                |
| phone        | VARCHAR(15)  | NOT NULL                       |
| password     | VARCHAR(255) | Hashed, NOT NULL               |
| created_at   | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP      |

### `books` Table
| Field        | Type         | Constraints                    |
|--------------|--------------|--------------------------------|
| id           | INT          | PRIMARY KEY, AUTO_INCREMENT     |
| title        | VARCHAR(100) | NOT NULL                      |
| author_name  | VARCHAR(100) | Fetched from user on insert   |
| genre        | VARCHAR(50)  | NOT NULL                     |
| description  | TEXT         |                              |
| created_at   | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP    |
| added_by     | INT          | FOREIGN KEY                  |

---

## 🚀 Setup Instructions

### 1️⃣ Backend (PHP + MySQL)

1. Clone the repo and go to the `/server` directory.
2. Create a database (e.g., `book_management`).
3. Import the SQL schema using `phpMyAdmin` or CLI.
4. Configure your DB credentials in `/server/config/db.php`.
5. Ensure Apache and MySQL are running (use XAMPP/WAMP).
6. Backend folder structure:

server/
│
├── auth/
│ ├── login.php
│ ├── logout.php
│ └── register.php
│
├── books/
│ ├── add.php
│ ├── delete.php
│ ├── edit.php
│ └── get.php
│
└── config/
└── db.php

markdown
Copy
Edit

### 2️⃣ Frontend (React.js)

1. Navigate to `/client`.
2. Run `npm install` to install dependencies.
3. Run `npm start` to launch the development server.
4. Folder structure:

client/
│
├── node_modules/
│
├── public/
│
└── src/
├── components/
├── .gitignore
├── App.css
├── App.js
├── App.test.js
├── index.css
├── index.js
├── logo.svg
├── reportWebVitals.js
├── setupTests.js
├── package-lock.json
└── package.json

---

## 💡 Extra Features

- Modern Bootstrap UI with mobile responsiveness
- Clean, reusable components
- Client-side validation with real-time feedback
- Optimized API structure
- Secure password hashing

---

## 🧪 Testing Tips

- Register with a new Gmail address (e.g., `example@gmail.com`)
- Try registering with the same email again to test duplicate handling
- Login with incorrect credentials to see error messages
- Add books, then try editing, deleting, and viewing others’ books

---

## 🙋‍♀️ Developed By

**Bhagya**  
Computer Science & Engineering  
Gayatri Vidya Parishad College of Engineering  
Full Stack Developer

---

## 📧 Contact

- Email: bhagya06112005@gmail.com
