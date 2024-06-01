// Arquivo server.js
const http = require('http');
const host = 'localhost';
const port = 8080;
const requestListener = function (req, res) {
    console.log('request received');
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end('<h1>deu certo</h1>');
};
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});