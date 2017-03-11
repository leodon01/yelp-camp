//AUTH ROUTES

//show register form
app.get("/register", function(req, res){
  res.render("register.ejs");
});

//handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register.ejs");
        }

        passport.authenticate("local")(req, res, function(){
          console.log("made it this far");
           res.redirect("/campgrounds");
        });
    });
});
// show login form
app.get("/login", function(req, res){
   res.render("login.ejs");
});
// handling login logic
app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
