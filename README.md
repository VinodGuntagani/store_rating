# 🏪 Store Rating Platform

A full-stack web application where users can rate stores, store owners can monitor their ratings, and administrators can manage the entire system.

---

## 📝 Note on AI Usage

I want to be transparent: I used AI (ChatGPT) during the early stages of this project — primarily to get started with the architecture, understand how to structure a role-based system, and debug issues I was stuck on. As the project progressed, I took full ownership — building, testing, and integrating each part myself, and making sure I understood every piece of code before moving on. AI was a starting point and a learning aid, not a substitute for the actual work.

> This was also my first project on this tech stack!

---

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
  - [Database Setup](#database-setup)
- [Database Schema](#database-schema)
- [Sample Data](#sample-data)
- [API Modules](#api-modules)
- [Roles & Permissions](#roles--permissions)
- [Default Ports](#default-ports)
- [Future Improvements](#future-improvements)

---

## ✨ Features

### 👤 Normal User
- Register and log in
- View all stores
- Submit and modify ratings
- View their submitted ratings
- Update password

### 🏬 Store Owner
- Log in securely
- View owned stores and their average ratings
- View users who rated their stores
- Rate other stores
- Update password

### 🛡️ System Administrator
- Add stores, users (normal, admin, owner)
- Assign stores to owners
- Dashboard statistics: total users, stores, and submitted ratings
- View and search all stores and users with detailed info
- Sort tables, view user details and rating history

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Vite, Axios, React Router DOM |
| Backend | Node.js, Express.js |
| Database | MySQL |
| Authentication | JWT (JSON Web Tokens) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed
- MySQL installed and running

---

### Frontend Setup

```bash
# Create the Vite + React project
npm create vite@latest frontend

# Select: React > JavaScript
cd frontend

# Install dependencies
npm install

# Install required packages
npm install axios react-router-dom

# Start the dev server
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

### Backend Setup

```bash
# Create and enter the backend directory
mkdir backend && cd backend

# Initialize Node project
npm init -y

# Install dependencies
npm install express mysql2 cors bcryptjs jsonwebtoken dotenv

# Optional: install nodemon for auto-restart
npm install -g nodemon

# Start the server
node app.js
```

Backend runs at: `http://localhost:5000`

---

### Database Setup

```sql
-- Open MySQL
-- mysql -u root -p

CREATE DATABASE storerating;
USE storerating;
```

**Configure Database Connection** — update `backend/db.js`:

```js
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "YOUR_PASSWORD",
  database: "storerating",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;
```

---

## 🗄️ Database Schema

### Users Table

```sql
CREATE TABLE users (
  id       INT PRIMARY KEY AUTO_INCREMENT,
  name     VARCHAR(255),
  email    VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  address  TEXT,
  role     VARCHAR(50)
);
```

### Stores Table

```sql
CREATE TABLE stores (
  id       INT PRIMARY KEY AUTO_INCREMENT,
  name     VARCHAR(255),
  email    VARCHAR(255),
  address  TEXT,
  owner_id INT,
  FOREIGN KEY (owner_id) REFERENCES users(id)
);
```

### Ratings Table

```sql
CREATE TABLE ratings (
  id       INT PRIMARY KEY AUTO_INCREMENT,
  user_id  INT,
  store_id INT,
  rating   INT,
  FOREIGN KEY (user_id)  REFERENCES users(id),
  FOREIGN KEY (store_id) REFERENCES stores(id)
);
```

---

## 🌱 Sample Data

```sql
-- Admin user | password = Admin@123
INSERT INTO users (name, email, password, address, role)
VALUES (
  'Admin',
  'admin@gmail.com',
  '$2b$10$.9qrHzWsMG32bGqV7XMLKup0ScFr0GQGFgVgE4tcol4ohSJN6P8Pi',
  'Admin Address',
  'ADMIN'
);
```

> Use the admin dashboard to create owners, and normal registration for users.

---

## 📡 API Modules

| Module | Description |
|--------|-------------|
| Authentication APIs | Login, register, JWT handling |
| Store APIs | CRUD operations for stores |
| Rating APIs | Submit, update, and fetch ratings |
| Admin APIs | User and store management, dashboard stats |
| Owner APIs | Owner-specific store and rating views |

---

## 🔐 Roles & Permissions

| Role | Description |
|------|-------------|
| `USER` | Browse stores and submit/modify ratings |
| `OWNER` | Monitor ratings for owned stores, rate other stores |
| `ADMIN` | Full access: manage users, stores, and view dashboard |

Authentication is handled via **JWT** for login sessions, protected routes, and role-based access control.

---

## 🌐 Default Ports

| Service | Port |
|---------|------|
| Frontend | `5173` |
| Backend | `5000` |
| MySQL | `3306` |

---

## 🔮 Future Improvements

- [ ] Improved UI styling and responsive design
- [ ] Pagination for large data sets
- [ ] Protected frontend routes
- [ ] Toast notifications for user feedback
- [ ] Edit and delete functionality
- [ ] Deployment support (e.g., Docker, cloud hosting)
