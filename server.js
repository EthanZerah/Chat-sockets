const http = require('http');
const fs = require('fs');

fs.readFile('./inex.html','utf8', (err,data) => {
    if (err) {
        console.error(err)
    }
    if(data){
        const server = http.createServer((req,res)=>{
            console.log(req.url);
            res.end(data);
        });
        const io = require('socket.io')(server);
        
        let messages = [];
        io.on('connection',client => {
            client.on('firstConnection',() => client.emit('message',messages));

            client.on('message',data => {
                messages.push(data);
                io.emit('message',messages);
            });
        });

        server.listen(3000);
    }
});