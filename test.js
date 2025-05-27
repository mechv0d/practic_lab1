// используя исходный код лр 2, необходимо вынести код, отвечающий за обработку логики в модуль (отдельный, экспортируемый)
// а html файл изменить таким образом чтобы все текстовые статические сообщения были константами (index.html) и хранились
// на уровне нода

const http = require('http');
const fs = require('fs');
const path = require('path'); // для удобной работы с путями

const port = 3000;
const publicDirName = 'public';
const rootDir = path.join(__dirname, publicDirName);

// ОТДЕЛЬНАЯ ФУНКЦИЯ ДЛЯ ВОЗВРАТА СЕРВЕРНОЙ ОШИБКИ
const writeError_500 = (res) => {
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end('500 - Internal Server Error');
}

const server = http.createServer((req, res) => {
    let filePath = path.join(rootDir, req.url === '/' ? 'index.html' : req.url) // путь файла из запроса

    // Читаем файлик
    fs.readFile(filePath, (rfErr, data) => {
        if (rfErr) { // Если файл не найден
            fs.readFile(path.join(rootDir, '404.html'), (rfErr, data) => {
                if (rfErr) { // Если 404.html не найден
                    writeError_500(res); // УМЕР СЕРВАК :(
                    return;
                }

                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end(data);
            });
            return;
        }

        let ext = path.extname(filePath);

        let contentType; // БЕЗ ЭТОГО НЕ БУДЕТ НИ СТИЛЕЙ, НИ JS, НИ КАРТИНОЧЕК
        if (ext === '.css') contentType = 'text/css';
        else if (ext === '.js') contentType = 'text/javascript';
        else if (ext === '.png') contentType = 'image/png';
        else contentType = 'text/html';
        // При надобности сюда добавить остальные типы

        res.writeHead(200, {'Content-Type': contentType});
        res.end(data)
    });
});

// ЗАПУСКАЕМ ПЛОД НЕВЗАИМНОЙ ЛЮБВИ
server.listen(port, 'localhost', () => {
    console.log(`Сервер запущен успешно на http://localhost:${port}`);
});