const http = require('http');

const STUDENT = {
    name: 'Andreiteva Anastasia',
    group: 'IAFR-2302',
    speciality: 'Informatica Aplicata'
};

// /api/courses
const COURSES = [
    { name: 'Web Development', teacher: 'Dr. Elena Popescu', credits: 5 },
    { name: 'Databases', teacher: 'Prof. Ion Rusu', credits: 4 },
    { name: 'Algorithms and Data Structures', teacher: 'Dr. Maria Ciobanu', credits: 6 }
];

const FACTS = [
    'Node.js использует однопоточный event loop для обработки запросов.',
    'Первая версия Node.js была выпущена в 2009 году Райаном Далем.',
    'npm — крупнейший в мире реестр пакетов программного обеспечения.',
    'Node.js построен на движке V8, который также используется в Google Chrome.',
    'Модуль http входит в стандартную библиотеку Node.js и не требует установки.'
];

function formatDateTime(date) {
    const pad = (n) => String(n).padStart(2, '0');
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

// Логирует каждый запрос в формате: HTTP Method | URL | Date and Time
function logRequest(req) {
    console.log(`${req.method} ${req.url} | ${formatDateTime(new Date())}`);
}

const server = http.createServer((req, res) => {
    logRequest(req);

    if (req.method === 'GET' && req.url === '/') {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Добро пожаловать! Это сервер, созданный в рамках лабораторной работы №1 по Node.js.');
    }
    else if (req.method === 'GET' && req.url === '/about') {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end(
            'Лабораторная работа №1: "Создание простого HTTP-сервера на Node.js".\n' +
            'Приложение демонстрирует работу со встроенным модулем http: обработку различных ' +
            'маршрутов и HTTP-методов, ответы в формате JSON и логирование каждого запроса.'
        );
    }
    else if (req.method === 'GET' && req.url === '/student') {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end(`${STUDENT.name}, группа ${STUDENT.group}`);
    }
    else if (req.method === 'GET' && req.url === '/api/student') {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(STUDENT));
    }
    else if (req.method === 'GET' && req.url === '/time') {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end(`Текущая дата и время: ${formatDateTime(new Date())}`);
    }
    else if (req.method === 'GET' && req.url === '/api/courses') {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(COURSES));
    }
    else if (req.method === 'GET' && req.url === '/api/fact') {
        // Собственный маршрут: возвращает случайный факт о Node.js в формате JSON
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        const fact = FACTS[Math.floor(Math.random() * FACTS.length)];
        res.end(JSON.stringify({ fact }));
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('404 - Page not found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
