const mongoose=require("mongoose");

const contributionSchema=new mongoose.Schema({
    campaignID:{
        type:String,
        required:true,
        unique:false,
    },
    name:{
        type:String,
        required:true,
        unique:false,
    },
    userID:{
        type:String,
        required:true,
        unique:false,
    },
    amount:{
        type:Number,
        required:true,
        unique:false,
    },
    currency:{
        type:String,
        required:false,
        unique:false,
    },
    payments:{
        type:[Number],
        required:true,
        unique:false,
    }
});

const contribution=mongoose.model("contributions",contributionSchema);
module.exports=contribution;