const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware для обработки JSON
app.use(express.json());

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

// Пример API для управления
app.post('/api/action', (req, res) => {
    // Здесь можно добавить логику для управления сервером
    console.log('Action received:', req.body);
    res.json({ message: 'Action executed', data: req.body });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});