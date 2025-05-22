const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const rootDir = path.join(__dirname, 'public');

let debug = true;

const writeError_500 = (res) => {
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end('500 - Internal Server Error');
}

const server = http.createServer((req, res) => {
    let filePath = path.join(rootDir, req.url === '/' ? 'index.html' : req.url) // файл из запроса

    fs.access(filePath, fs.constants.F_OK, (acErr) => {
        if (acErr) { // Если ошибка доступа
            fs.readFile(path.join(rootDir, '404.html'), (rfErr, data) => {
                if (rfErr) { // Если 404.html не найден
                    writeError_500(res);
                    return;
                }

                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end(data);
            });
            return;
        }

        // Доступ к файлу есть
        fs.readFile(filePath, (rfErr, data) => {
            if (rfErr) { // Если файл не найден
                writeError_500(res);
                return;
            }

            let ext = path.extname(filePath);

            let contentType;
            if (ext === '.css') contentType = 'text/css';
            else if (ext === '.js') contentType = 'text/javascript';
            else if (ext === '.png') contentType = 'image/png';
            else contentType = 'text/html';
            // При надобности сюда добавить остальные типы

            res.writeHead(200, {'Content-Type': contentType});
            res.end(data)
        });
    });
});

server.listen(port, 'localhost', () => {
    console.log(`Сервер запущен успешно на http://localhost:${port}`);
});