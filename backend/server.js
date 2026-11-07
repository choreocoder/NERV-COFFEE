console.log("THIS FILE IS RUNNING");


const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Database connection (create first so routes can use it safely)
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

let dbConnected = false;
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message || err);
    dbConnected = false;
    // continue running the server with an in-memory fallback
    return;
  }
  dbConnected = true;
  console.log("Connected to the MySQL database.");
});

// Simple in-memory cart fallback so the app can function without DB
const cart = [];

app.get("/products", (req, res) => {
  if (!dbConnected) {
    return res.status(503).json({ error: "Database not connected" });
  }

  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ error: err.message || err });
    res.json(results);
  });
});

// Cart endpoints (in-memory)
app.post("/cart", (req, res) => {
  const item = req.body;
  if (!item || !item.id) return res.status(400).json({ error: "Invalid item" });
  cart.push(item);
  res.status(201).json({ message: "Added to cart", cart });
});

app.get("/cart", (req, res) => {
  res.json(cart);
});

// Remove an item from the in-memory cart by id
app.delete('/cart/:id', (req, res) => {
  const id = req.params.id;
  const idx = cart.findIndex((c) => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Item not found' });
  cart.splice(idx, 1);
  res.json({ message: 'Removed', cart });
});

// Clear the cart
app.post('/cart/clear', (req, res) => {
  cart.length = 0;
  res.json({ message: 'Cart cleared', cart });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});