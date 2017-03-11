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
