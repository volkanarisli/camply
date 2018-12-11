var express = require("express");
var app = express();
var bodyParser =require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yeld_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs")

//SCHEMA SETUP
var campgroundShcema = new mongoose.Schema({
   name: String,
   image: String,
   description:String
});

var Campground = mongoose.model("Campground",campgroundShcema);

/**Campground.create({name:"Salmon Greek", image:"https://cdn.pixabay.com/photo/2015/03/26/10/46/volcanoes-691939_1280.jpg",description:"This is a huge granthill,no bathrooms"},function (err,campground) {
                      if (err) {
                          console.log("err")
                      }else{
                          console.log("NEWLY CREATED CAMPGROUND");
                          console.log(campground);
                      }
                  });**/
var campgrounds = [
        
        {name:"Salmon Greek", image:"https://pixabay.com/get/e83db7082af3043ed1584d05fb1d4e97e07ee3d21cac104496f4c67ba5eab4bc_340.jpg"},
        {name:"Grantine Hill", image:"https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144291f7c37ba0ecb1_340.jpg"},
        {name:"Mountain Goats Sites", image:"https://farm4.staticflickr.com/3246/2984979490_bcd60959de.jpg"},
        {name:"Mountain Goats Sites", image:"https://farm4.staticflickr.com/3246/2984979490_bcd60959de.jpg"},
        {name:"Mountain Goats Sites", image:"https://farm4.staticflickr.com/3246/2984979490_bcd60959de.jpg"},
        {name:"Mountain Goats Sites", image:"https://farm4.staticflickr.com/3246/2984979490_bcd60959de.jpg"},
        {name:"Mountain Goats Sites", image:"https://farm4.staticflickr.com/3246/2984979490_bcd60959de.jpg"},
        ];

app.get("/",function (req,res) {
res.render("landing");
});



app.get("/campgrounds",function (req,res) {
    
        Campground.find({},function(err,allCampgrounds) {
            if (err) {
                console.log(err)
            } else {
                res.render("index",{campgrounds:allCampgrounds})
            }
        });
});

app.get("/campgrounds/new",function(req, res) {
   res.render("new.ejs"); 
});
app.post("/campgrounds",function(req,res) {
 var name = req.body.name;
 var image = req.body.image;
 var description = req.body.description;
 var newCampground = {name : name,image : image,description: description};
 
 Campground.create(newCampground,function (err,newlyCreated) {
     if (err) {
         console.log(err)
     } else {
         res.redirect("/campgrounds")
     }
 });
 
 });
 
 app.get("/campgrounds/:id",function(req, res) {
    Campground.findById( req.params.id,function (err,foundCampground) {
       if (err) {
           console.log(err)
       } else {
           res.render("show",{campground:foundCampground});
       }
    });
     
 })

app.listen(process.env.PORT,process.env.IP,function () {
    console.log("The YeldCamp Server Has Started");
});