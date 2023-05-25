const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

var opsys = process.platform;
var device_path='/dev/ttyArduino';

// const { autoDetect } = require('@serialport/bindings-cpp');
// const Binding = autoDetect();

// Binding.list().then(ports => {
//     if (opsys == "win32" || opsys == "win64") {
//         const port = ports.find(port => /2341/i.test(port.vendorId));
//         if (port) device_path=port.path;
//     } else if (opsys == "linux") {
//         const port = ports.find(port => /8086/i.test(port.vendorId));
//         if (port) device_path=port.path;
//     }
//     // const port = ports.find(port => /8086/i.test(port.vendorId));
//     //console.log(device_path);
// });

const { SerialPort, ReadlineParser } = require('serialport');
const port = new SerialPort({
    path: device_path,
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
});
const parser = port.pipe(new ReadlineParser());

app.get("/", (req, res)=>{
    res.sendFile(__dirname+'/index.html');
});


io.on('connection', (socket) => {
    socket.on('toArduino', function (data) {
        console.log(data);
        port.write( data.pin );
    });
    // socket.emit('lights', {value: brightness});
    // socket.on('data', function(data) {
    
    //     console.log('Received data from port: ' + data);
    //     socket.emit('data', data);
          
    //   });
});
// parser.on('data', console.log);

parser.on('data', function(data){
    console.log("received from arduino "+data);
    io.emit('data',data);
});

console.log("Web Server Started go to `http://localhost:8080` in your  Browser.");

server.listen(8080,()=>{
    console.log("listening on *.8080");
});