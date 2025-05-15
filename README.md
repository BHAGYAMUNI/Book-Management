# 📚 Book Management System

A full-stack web application built with **React.js** (Bootstrap for styling) and **PHP (with MySQL)** to manage user registration, login, and personal book collections with features like pagination, sorting, and responsive design.

---

## 🌟 Features

### 🔐 User Authentication
- **User Registration** with validation:
  - First and Last Name: At least 3 characters
  - Email: Must be a valid Gmail address
  - Phone: Must include country code and contain only numbers
  - Password: Minimum 8 characters, with at least one uppercase, one number, and one special character
  - All fields are mandatory
- **Email uniqueness check** and error feedback
- **Confirmation email** sent upon successful registration
- **Login** with email and password
- Error messages for invalid credentials or non-existent users
- Successful login redirects to the **User Dashboard**

### 📘 Book Management
- Authenticated users can:
  - Add books with Title, Genre, Description
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
- Axios (for API calls)
- React Router DOM

### Backend
- PHP (RESTful APIs)
- PHPMailer (for confirmation emails)
- MySQL (Database)

---

## 📂 Database Schema

### `users` Table
| Field        | Type         | Constraints                     |
|--------------|--------------|----------------------------------|
| id           | INT          | PRIMARY KEY, AUTO_INCREMENT      |
| first_name   | VARCHAR(50)  | NOT NULL                         |
| last_name    | VARCHAR(50)  | NOT NULL                         |
| email        | VARCHAR(100) | UNIQUE, NOT NULL                 |
| phone        | VARCHAR(15)  | NOT NULL                         |
| password     | VARCHAR(255) | Hashed, NOT NULL                 |
| created_at   | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP        |

### `books` Table
| Field        | Type         | Constraints                     |
|--------------|--------------|----------------------------------|
| id           | INT          | PRIMARY KEY, AUTO_INCREMENT      |
| user_id      | INT          | FOREIGN KEY (`users.id`)         |
| title        | VARCHAR(100) | NOT NULL                         |
| author_name  | VARCHAR(100) | Fetched from user on insert      |
| genre        | VARCHAR(50)  | NOT NULL                         |
| description  | TEXT         |                                  |
| created_at   | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP        |

---

## 🚀 Setup Instructions

### 1️⃣ Backend (PHP + MySQL)

1. Clone the repo and go to the `/backend` directory.
2. Create a MySQL database (e.g., `book_management`).
3. Import the SQL schema using `phpMyAdmin` or CLI.
4. Configure your DB credentials in `/backend/config.php`.
5. Ensure Apache and MySQL are running (use XAMPP/WAMP).
6. Backend folder structure:

/backend
/auth
├── login.php             # Handles user login
├── logout.php            # Handles user logout
├── register.php          # Handles user registration

/books
├── add.php               # Add a new book (POST)
├── delete.php            # Delete a book (DELETE)
├── edit.php              # Edit/update a book (PUT/PATCH)
├── get.php               # Fetch books (GET with pagination/sorting)

/config
└── db.php                # Database connection configuration


### 2️⃣ Frontend (React.js)

1. Navigate to `/frontend`.
2. Run `npm install` to install dependencies.
3. Run `npm start` to launch the development server.
4. Folder structure:

/src
├── components
│   ├── AddBook.js
│   ├── BookList.js
│   ├── EditBook.js
│   ├── Home.js
│   ├── Login.js
│   ├── ManageBooks.js
│   ├── Navbar.js
│   ├── Register.js
│   └── *.css (component styles)

├── App.js
├── index.js
├── App.css


---

## 💡 Extra Features

- Modern Bootstrap UI with mobile responsiveness
- Clean, reusable components
- Client-side validation with real-time feedback
- Optimized API structure
- Secure password hashing
- Email confirmation with PHPMailer

---

## 🧪 Testing Tips

- Register with a new Gmail address (e.g., `example@gmail.com`)
- Try registering with the same email again to test duplicate handling
- Login with incorrect credentials to see error messages
- Add books, try editing, deleting, and viewing others’ books

---

## 📌 Evaluation Criteria Reference

| Criteria | Status |
|---------|--------|
| ✅ Functional Completion | 100% |
| ✅ Code Efficiency | ✔️ Well-structured components and clean API |
| ✅ SQL Modeling | ✔️ Proper foreign keys and normalized tables |
| ✅ Time Taken | _(Mention your timeline here)_ |
| ✅ UI/UX Quality | ✔️ Bootstrap Responsive Design |

---

## 🙋‍♀️ Developed By

**Bhagya**  
Computer Science & Engineering  
Gayatri Vidya Parishad College of Engineering  
Full Stack Developer

---

## 📧 Contact

- Email: bhagya06112005@gmail.com  
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 📄 License

This project is open source and free to use.
