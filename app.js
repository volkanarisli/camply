var express = require("express");
var app = express();
var bodyParser =require("body-parser")

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs")
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
    
        
        res.render("campgrounds",{campgrounds:campgrounds});
});

app.get("/campgrounds/new",function(req, res) {
   res.render("new.ejs"); 
});
app.post("/campgrounds",function(req,res) {
 var name = req.body.name;
 var image = req.body.image;
 var newCampground = {name : name,image : image};
 campgrounds.push(newCampground);
 res.redirect("/campgrounds")
});

app.listen(process.env.PORT,process.env.IP,function () {
    console.log("The YeldCamp Server Has Started");
});