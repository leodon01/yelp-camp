var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  = require("./models/campground"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//Passes currentUser variable through every route
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
})

//PASSPORT CONFIG

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});





// Campground.create(
//   {
//     name: "Yellow Asterbute",
//     image: "http://www.bellingham.org/wp-content/uploads/2013/08/Yellow-Aster-Butte-view-of-American-Border-Peak.jpg",
//     description: "Goregous, high altitude valley setting featuring sprawling alpine lakes and colorful moss pastures. 7 mile hike from trail head."
//   }, function(err, campground) {
//     if(err) {
//       console.log(err);
//     } else {
//       console.log("CAMPGROUND " + campground.name + " ADDED");
//       console.log(campground);
//     }
//   });


//ROUTES
app.get("/", function(req, res) {
  res.render("landing.ejs");
});


//INDEX ROUTE - shows all campgrounds...Soooo many campgrounds
app.get("/campgrounds", function(req, res) {

  Campground.find({}, function(err, allCampgrounds) {
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds/index.ejs", {campgrounds: allCampgrounds});
      console.log(req.user);
    }
  });
});

//CREATE ROUTE
app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = {name: name, image: image, description: description}

  Campground.create(newCampground, function(err, newlyCreated) {
    if(err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds")
    }
  });
});

//NEW ROUTE
app.get("/campgrounds/new", function(req, res) {
  res.render("campgrounds/new.ejs");
});

//SHOW ROUTE
app.get("/campgrounds/:id", function(req, res) {
  //find the campground with provided id

  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      console.log(foundCampground);
      res.render("campgrounds/show.ejs", {campground: foundCampground
      });
    }
  });
});

//===========================
//COMMENTS ROUTES
//===========================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new.ejs", {campground: campground});
    }
  })
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
  //look up campground using id
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      })
    }
  });
  //create new comment
  //connect new comment to campground
  //redirect to show page

});

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

app.listen(3002, function() {
  console.log("server launched on port 3002");
});
