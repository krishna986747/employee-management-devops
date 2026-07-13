CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    department VARCHAR(100) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO employees (name,email,department,salary)
VALUES
('Krishna','krishna@gmail.com','IT',50000),
('Ram','ram@gmail.com','HR',40000),
('Hari','hari@gmail.com','Finance',45000);
