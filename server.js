const http = require('http');
const fs = require('fs');


fs.readFile('./index.html','utf8', (err,data) => {
    if (err) {
        console.error(err)
    }
    if(data){
        const server = http.createServer((req,res)=>{
            res.end(data);
        });
        const io = require('socket.io')(server);

        io.on('connection', function(socket){
            console.log('a user connected');
            socket.on('disconnect', function(){
              console.log('user disconnected');
            });
          });
        
        let messages = [];
        io.on('connection',client => {
            client.on('firstConnection',() => client.emit('message',messages));

            client.on('message',data => {
                messages.push(data);
                io.emit('message',messages);
                console.log(messages);
            });
        });

        server.listen(3000);
    }
});