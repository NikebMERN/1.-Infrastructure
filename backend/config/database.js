//? Importing packages
const mysql = require("mysql");

//* Creating connection to db in phpmyadmin
const connection = mysql.createConnection({
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_DATABASE}`,
});

//* Connect to db
connection.connect((err) => {
    if (err) {
        console.error("Error connecting to database:", err);
        return;
    }
    console.log("Connected to database");

    //* Create tables if they don't exist
    const createProjectsTableQuery = `
    CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) NOT NULL,
        priority TEXT NOT NULL,
        assigned_resources VARCHAR(255),
        budget DECIMAL(10, 2),
        timeline VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`;

    //* Query the command and creating table
    connection.query(createProjectsTableQuery, (err, results) => {
        if (err) {
            console.error("Error creating projects table:", err);
            return;
        }
        console.log("Projects table created successfully");
    });
});

module.exports = connection;
