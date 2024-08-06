const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const ws = require('ws');

const server = http.createServer();
const wss = new ws.Server({server});

wss.on('connection',(ws) =>{
    console.log('connected');

    sendLast10Lines(ws);

    fs.watchFile(path.join(__dirname,'tp.txt'),{interval: 100},(curr, prev) =>{
        if(curr.mtime != prev.mtime){
            sendNewLines(ws,prev.size);
        }
    })
    ws.on('close',() =>{
        console.log('Disconnected');
    })
})
sendNewLines = (ws,prevSize) =>{
    fs.open(path.join(__dirname,'tp.txt'), 'r', (err,fd) =>{
        if(err){
            console.log('error in Opening the File');
            return;
        }
        fs.fstat(fd,(err, stats) =>{
            if (err) {
                console.error('Error getting file stats:', err);
                return;
            }
            const newsz = stats.size;
            const buffer = Buffer.alloc(newsz-prevSize);
            fs.read(fd, buffer, 0, newsz-prevSize, prevSize,(err, bytesRead,buffer) =>{
                if (err) {
                    console.error('Error reading new lines:', err);
                    return;
                }
                const newLines = buffer.toString('utf8');
                ws.send(newLines);
                fs.close(fd, (err) => {
                    if (err) {
                        console.error('Error closing file:', err);
                    }
                });
            })
        })
    })
}
sendLast10Lines = (ws) =>{
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    
    fs.readFile(path.join(__dirname,'tp.txt'),'utf8',(err,data) =>{
             if(err){
                console.log('File Reading Error');
                return;
             }
             var arrData = data.split('\n');
             var len = arrData.length-1;
             let i=0;
             var newData=new Array();
             while(i<10){
                newData[i++] = arrData[len--];
             }
             ws.send(JSON.stringify(newData))
    })
}

server.listen('3000',(err) =>{
       console.log('Started');
})