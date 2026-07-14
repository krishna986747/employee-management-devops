# Employee Management DevOps Project

## Project Overview

This project is a simple Employee Management System developed using Node.js, Express.js, MySQL, HTML, CSS, and JavaScript. It demonstrates CRUD operations and a basic CI pipeline using Jenkins and Docker Compose.

---

## Technologies Used

- Node.js
- Express.js
- HTML
- CSS
- JavaScript
- MySQL
- Git
- GitHub
- Docker
- Docker Compose
- Jenkins Freestyle
- Poll SCM

---

## Features

- View Employees
- Add Employee
- Update Employee
- Delete Employee
- Search Employee

---

## Project Structure

```
employee-management-devops/
│
├── app.js
├── db.js
├── Dockerfile
├── docker-compose.yml
├── package.json
├── README.md
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── sql/
    └── employee.sql
```

---

## CI/CD Workflow

```
Developer
    │
    ▼
Git Commit
    │
    ▼
Git Push
    │
    ▼
GitHub
    │
    ▼
Jenkins Poll SCM
    │
    ▼
Build
    │
    ▼
Docker Compose
    │
    ▼
Application Updated
```

---

## How to Run

```bash
git clone <repository-url>

cd employee-management-devops

docker compose up --build
```

Open:

```
http://localhost:3000
```

---

## Author

Krishna Parajuli
