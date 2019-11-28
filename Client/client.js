const io = require("socket.io-client");
const fs= require("fs");

const   ioClient = io.connect("http://localhost:5555");

 //   ioClient.emit('image',3,4);

 fs.readFile('image.png',function(err,data){
    if (err) throw err; 
    base64=Buffer(data).toString('base64');
    ioClient.emit('image',base64,1);
 })
/*
 io.on('yes',function(){
   Console.log("yes");
 });*/