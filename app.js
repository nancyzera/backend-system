require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json()); 

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'tvet_registration'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});




app.get('/students', (req, res) => {
    const sql = 'SELECT * FROM students';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});


app.get('/courses', (req, res) => {
    const sql = 'SELECT * FROM courses';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});


app.get('/enrollments', (req, res) => {
    const sql = `
        SELECT 
            enrollments.id, 
            students.name AS student_name, 
            courses.course_name, 
            enrollments.enrollment_date 
        FROM enrollments
        JOIN students ON enrollments.student_id = students.id
        JOIN courses ON enrollments.course_id = courses.id
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});
// --- TASK 3: API ENDPOINTS ---

// 1. Register a student [cite: 42]
app.post('/students', (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO students (name, email) VALUES (?, ?)';
    db.query(sql, [name, email], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ id: result.insertId, name, email });
    });
});

// 2. Add a course [cite: 44]
app.post('/courses', (req, res) => {
    const { course_name, credits } = req.body;
    const sql = 'INSERT INTO courses (course_name, credits) VALUES (?, ?)';
    db.query(sql, [course_name, credits], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ id: result.insertId, course_name, credits });
    });
});

// 3. Enroll student in a course [cite: 47]
app.post('/enrollments', (req, res) => {
    const { student_id, course_id } = req.body;
    const sql = 'INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)';
    db.query(sql, [student_id, course_id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ message: "Enrollment successful" });
    });
});

// 4. List all students [cite: 43]
app.get('/students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));