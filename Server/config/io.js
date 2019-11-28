
module.exports = function(io,pool) {
    io.on('connection', function(socket) 
    {	
        console.log("Connected"); 
        socket.on('disconnect', function () {
            console.log(socket.id);
            console.log("Socket disconnected");
        });

        socket.on('image',async function(data,user){

            var current_time= getYear()+"-"+getMonth()+"-"+getDate()+" "+getTime();
            var sql_query= "INSERT INTO images (email,image,date) values (\'"+user+"\',\'"+data+"\',\'"+current_time.toString()+"\');";      
            await pool.query(sql_query);
            sql_query= "Select count_Images from user where email=\'"+user+"\'";
            var count =await pool.query(sql_query);
            if (count<50) {
                count++; 
                sql_query="Update user set count_Images=\'"+count+"\' where email = \'"+user+"\'";
                await pool.query(sql_query);
            }
            else{
                count-=50;
                sql_query="Update user set count_Images=\'"+count+"\' where email = \'"+user+"\'";
                await pool.query(sql_query);
                sql_query="Select id from images where email=\'"+user+"\' order by id" ;
                var image = await pool.query(sql_query);
                sql_query="Delete from images where id=\'"+image[0]+"\'";
            }
            socket.emit('Yes');
            
        });
        
    });
}

function getTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    return hour + ":" + min + ":" + sec;
}

function getDate() {

    var date = new Date();

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return day;
}

function getMonth() {
    var date = new Date();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    return month;
}

function getYear() {

    var date = new Date();

    var year = date.getFullYear();

    return year;
}

