var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");

//root route
router.get("/",function (req,res) {
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
           res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
     });
});

//register form route
router.get("/register",function(req, res) {
   res.render("register"); 
});
//handle sign up logic
router.post("/register",function(req, res) {
   var newUser = new User({username : req.body.username});
    User.register(newUser,req.body.password,function (err,user) {
        if (err) {
           req.flash( "error",err.message);
            return res.render("register");
        } else {
            passport.authenticate("local")(req,res,function(){
               req.flash( "success","Welcome to YeldCamp" + user.username );
               res.redirect("/campgrounds");
            });
        }
    });
});
//show login form

router.get("/login",function(req, res) {
    res.render("login");
});
//login logic
router.post("/login",passport.authenticate("local",
        {
            successRedirect:"/campgrounds" ,
            failueRedirect: "/login",
            failureFlash: true
            
        }),function(req, res) {
});
//logout route
router.get("/logout",function(req, res) {
    req.logout();
    req.flash("success","Logged you out");
    res.redirect("/campgrounds");
});



module.exports = router;