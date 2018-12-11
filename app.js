var express = require("express"),
    app = express(),
    bodyParser =require("body-parser"),
    mongoose = require("mongoose"),
    flash    =require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    User       = require("./models/user"),
    seedDB     = require("./seeds");
 //requaring routes
var commentRoutes           = require("./routes/comments"),
    campgroundRoutes        = require("./routes/campgrounds"),
    indexRoutes              = require("./routes/index")
 
 
var url = process.env.DATABASEURL || "mongodb://localhost/yeld_camp";
mongoose.connect(url,{ useNewUrlParser: true });

//mongoose.connect("mongodb://volkan:volk0198@ds251332.mlab.com:51332/yeldcamp",{ useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs")
app.use(express.static(__dirname+"/public")); 
app.use(methodOverride("_method"));   
app.use(flash());
   //seed the database
 //seedDB(); 
   
   

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Once again rusty is the cutest dog",
    resave: false,
    saveUninitialized: false
    
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/",indexRoutes);







app.listen(process.env.PORT,process.env.IP,function () {
    console.log("The YeldCamp Server Has Started");
});