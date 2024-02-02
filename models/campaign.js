const mongoose=require("mongoose");

const campaignSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:false,
    },
    title:{
        type:String,
        required:true,
        unique:false,

    },
    description:{
        type:String,
        required:true,
        unique:false,
    },
    goal_amount:{
        type:String,
        required:true,
        unique:false,

    },
    end_date:{
        type:String,
        required:true,
        unique:false,

    },
    category:{
        type:String,
        required:true,
        unique:false,

    },
    });

const campaign=mongoose.model("campaigns",campaignSchema);
module.exports=campaign;
