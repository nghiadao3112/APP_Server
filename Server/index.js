const express =require("express");
const express_io =require("express");
const bodyParser=require("body-parser");
const session =require('express-session');
const Passport =require('passport');

const app =express();
const app_io=express_io();
const flash    = require('connect-flash');
const morgan       = require('morgan');
const server =require("http").Server(app);
const server_io =require("http").Server(app_io);
const io=require('socket.io')(server_io);
const multer = require('multer');
//const io=require('socket.io')(server);





//=======================================================
app.set('views', __dirname + '/views'); 
app.set('view engine','ejs');

require(__dirname+'/config/passport.js')(Passport);
//require(__dirname+'/config/socket.js')(io);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({secret:"mysecret"}));
app.use(Passport.initialize());
app.use(Passport.session());
app.use(flash());  
app.use( express.static("public"));
//===========================================================
var pool = require(__dirname+'/database/sqlmiddleware.js');
require(__dirname+'/routes.js')(app,Passport,pool);
require(__dirname+'/config/io.js')(io,pool);




//=====================================================/



//=========================================================
//ns.listen(5555,()=>console.log('io.....5555'));
server.listen(7777,()=> console.log('listenning....7777'));
server_io.listen(5555,()=> console.log('listenning io ....5555'));
