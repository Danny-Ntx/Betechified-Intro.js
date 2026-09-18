const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Bonus middleware: log every request
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// GET /
app.get("/", (req, res) => {
    res.send("My Week 2 API");
});

// POST /user
app.post("/user", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: "Name and email are required"
        });
    }

    res.json({
        message: `Hello, ${name}!`,
        email: email
    });
});

// GET /user/:id
app.get("/user/:id", (req, res) => {
    const id = req.params.id;

    res.json({
        message: `User ${id} profile`
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
