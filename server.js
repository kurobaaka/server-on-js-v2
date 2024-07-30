const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();
const PORT = 3500;

// Middleware для обработки JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Статические файлы
app.use(express.static(path.join(__dirname, 'public')));

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Панель управления
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Проверка логина
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === config.admin.username && password === config.admin.password) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Неверный логин или пароль' });
    }
});

// Пример API для управления
app.post('/api/action', (req, res) => {
    console.log('Action received:', req.body);
    res.json({ message: 'Action executed', data: req.body });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});