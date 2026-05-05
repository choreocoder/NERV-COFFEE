console.log("THIS FILE IS RUNNING");


const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.send(err);
    res.json(results);
  });
});

const db = mysql.createConnection({
    host: "localhost",
    user: "workbench_user",
    password: "StrongPass123!",
    database: "coffee_shop" 
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the MySQL database.");
});



app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});