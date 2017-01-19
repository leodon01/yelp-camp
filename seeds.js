var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comments");
var data = [
  {
    name: "Cloud's Rest",
    image: "http://www.makeyourdayhere.com/ImageRepository/Document?documentID=51",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Sky's Rest",
    image: "http://www.lanesboro.com/cms/img/campground-river-cs.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Horizon's Rest",
    image: "http://www.acadiamagic.com/280x187/md-campground.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
]

function seedDB() {
  //REMOVE ALL CAMPGROUNDS
  Campground.remove({}, function(err){
    if(err){
      console.log(err);
    } else {
      console.log("removed campgrounds");
      //ADD A FEW campgrounds
      data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
          if(err){
            console.log(err);
          } else {
            console.log("added a campground");
            //Creat comment
            Comment.create({
              text: "This place is dope....but no party :( ",
              author: "Dissapointed Raver"
            }, function(err, comment){
              if(err){
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log("created new comment");
              }
            });
          }
        });
      });
    }
  });


}


module.exports = seedDB();
