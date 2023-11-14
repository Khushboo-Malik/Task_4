require("dotenv").config();

const express=require("express");
const session = require("express-session"); 
const app=express();
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
app.use(cookieParser());
const User=require("./models/user");
const passport=require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {setUser}=require("./middleware/auth");
const {checkJwtCookie}=require("./middleware/middleware");

const {connectMongoDb}=require("./connection");
const PORT=process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: process.env.SECRET_KEY_SESSION, 
    resave: false,
    saveUninitialized: false
  }));

app.set("view engine", "ejs");
const {createCampaign,getCampaigns,getCampaign,myCampaigns,editCampaign,deleteCampaign}=require("./controllers/campaign");
const {contributeCampaign,campaignContributors}=require("./controllers/contribution");
const {send_mail_registration}=require("./controllers/mail");
const {payment}=require("./controllers/payment");

  passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
  },
  function(accessToken, refreshToken, profile, cb) {
    const domain = "akgec.ac.in";
    
    
    if (profile.emails && profile.emails[0].value.endsWith(domain)) {
      User.findOrCreate({
        name: profile.displayName,
        email: profile.emails[0].value,
        profile_photo_url: profile.photos[0].value
      }, function(err, user) {
        return cb(err, user);
      });
    } else {
      
      return cb("Only AKGEC email addresses are allowed", null);

    }
  }
));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, cb) {
    cb(null, user);
    
  });
  
  passport.deserializeUser(function(user, cb) {
    cb(null, user);
    
  });

app.get("/googleOAuth", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: "/register",
  failureRedirect: "/error",
}));

  app.get("/error",async(req,res)=>{
    return res.render("error");
  });

  app.post("/createCampaign",checkJwtCookie,createCampaign);

  app.get("/campaigns",getCampaigns);

  app.get("/campaign/:campaignId",getCampaign);

  app.get("/myCampaigns",checkJwtCookie,myCampaigns);

  app.put("/editCampaign/:campaignId",checkJwtCookie,editCampaign);

  app.delete("/deleteCampaign/:campaignId",checkJwtCookie,deleteCampaign);

  app.post("/contribute/:campaignId",checkJwtCookie,contributeCampaign);

  app.get("/campaignContributors/:campaignId",campaignContributors);

  app.get("/payment",checkJwtCookie,async(req,res)=>{
    
    return res.render("payment");
  });

  app.post("/payment",checkJwtCookie,payment);

app.get("/register",(req,res)=>{
  if(req.isAuthenticated()){
  const user=req.user;
  const email=user.email;
  send_mail_registration(email);
  const token=setUser(user);

  res.cookie("token",token);
  
  res.send("Registration Successfull!");

  }else{
    res.status(401).send({msg:"Unauthorized"})
  }
}); 

  connectMongoDb(`mongodb+srv://mailkhushboomalik:${process.env.MONGO_PASSWORD}@cluster1.kcrrp8w.mongodb.net/?retryWrites=true&w=majority`)
  .then(()=>console.log("MongoDB connected!"));
  
  app.listen(PORT,()=>console.log("Server Started!"));  



