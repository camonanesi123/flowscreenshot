const http = require('http');
const fs = require('fs');

const requestListener = function (req, res) {
    try {
        if (req.url==='/') {
            res.writeHead(200);
            let html = fs.readFileSync(__dirname+'/index.html');
            res.end(html);
        } else {
            let filename = __dirname+'/assets'+req.url;
            if (fs.existsSync(filename)) {
                /* res.set({
                    'Cache-Control': 'no-cache',
                    'Content-Type': row.content_type,
                    'Content-Length': row.file_length,
                    'Content-Disposition': 'attachment; filename=' + row.file_name
                }); */
                let buffer = fs.readFileSync(filename);
                res.end(buffer)
            } else {
                res.status(404).end('Not found')
            }
            
        }
    } catch (err) {
        console.log(err);
    }
}

const server = http.createServer(requestListener);
server.listen(8080);
