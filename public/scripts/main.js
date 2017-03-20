var now = new Date();
//reveal extra img url inputs in new.ejs
//still need to add transition
$("#plusURL").click(function(){
  $(".hiddenURL").toggleClass('hidden');
  $("#plusURL").toggleClass('fa-minus-square-o');
  $("#plusURL").toggleClass('fa-plus-square-o');
});

//highlight menu tabs in show.ejs
$(".testA li").click(function(){
  $(".testA .active").toggleClass('active');
  $(this).toggleClass('active');
});

//changes display to map
$("#mapTab").click(function(){
  $("#carousel").addClass("hidden");
  $("#googleMap").removeClass('hidden');

});

$("#reviewsTab").click(function(){
  $("#carousel").addClass("hidden");
  $("#googleMap").addClass('hidden');

});

$("#generalTab").click(function(){
  $("#carousel").removeClass("hidden");
  $("#googleMap").addClass('hidden');
});

//split campground name into multiple words



function myMap() {
var mapProp= {
    center:new google.maps.LatLng(51.508742,-0.120850),
    zoom:5,
};
var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

function getDate(string) {
  var today = string;
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10){
    dd='0'+dd
  } else if(mm<10){
    mm='0'+mm
  };

  today = dd + "/" + mm + "/" + yyyy;

}
document.getElementById("todayDate").value = now.toDateString();


console.log(now.toDateString());
