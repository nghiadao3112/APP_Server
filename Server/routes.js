module.exports = function(app, passport,pool) {
    app.use(function (req, res, next) {
        console.log(req.body);
        
      next()
      });
  //====================================================== 
    app.get('/',(req,res)=>{
      res.redirect('/login');
    });    
      
      
  //====================LOGIN==================================     
    app.get('/login', function(req, res) {
          res.render('login.ejs', { message: req.flash('loginMessage') }); 
      });
      
    app.post('/login', passport.authenticate('local-login', {
          successRedirect : '/Next',
          failureRedirect : '/login', 
          failureFlash : true
          
      }));
  //=====================REGISTER================================= 
    app.get('/register', function(req, res) {
          res.render('register.ejs', { message: req.flash('signupMessage') });
      });
    app.post('/register', passport.authenticate('local-signup', {
          successRedirect : '/login', 
          failureRedirect : '/register', 
          failureFlash : true 
          
      })); 
    //=====================NEXT================================= 
    app.get('/manage',async(req,res)=>{
        if (req.isAuthenticated()){
            var user=req.body.email;
            var sql_query="Select image from images where email=\'"+user+"\'";
            var images= await pool.query(sql_query);
            res.render('image.ejs',{ useraut:user,list_image:images});         
        }
        else{
          res.redirect('/login');
        }  
      });

}