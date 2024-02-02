const mongoose=require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema=new mongoose.Schema({


name:{
    type:String,
    required:true,
    unique:false,
},
email:{
    type:String,
    required:true,
    unique:true,
},
profile_photo_url:{
    type:String,
    required:false,
    unique:false,
},
});

userSchema.plugin(findOrCreate);
const user=mongoose.model("users",userSchema);

module.exports=user;
