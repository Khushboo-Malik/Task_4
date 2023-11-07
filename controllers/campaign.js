const Campaign = require("../models/campaign");

async function createCampaign(req,res){
    const body=req.body;
    try{
    
    const user=req.user;
    const userId=user._id;
    
    const result=await Campaign.create({
        userId:userId,
        title:body.title,
        description:body.description,
        goal_amount:body.goal_amount,
        end_date:body.end_date,
        category:body.category,

    });
    return res.json("New campaign created!");
} catch (error) {
    
    res.status(500).json("Server Error");
}
}

async function getCampaigns(req,res){

    try{const campaigns=await Campaign.find({});
        return res.json(campaigns);
    }catch(error){
        res.status(500).json({error:"An error occurred"});
    }}


async function getCampaign(req,res){

    try{
        const _id=req.params.campaignId;
        const campaign=await Campaign.findOne({"_id":_id});
        if(!campaign){
            res.status(404).json({error:"Campaign not found"});
        }
        else{
            return res.json(campaign);
        }
    }catch(error){
            res.status(500).json({ error: "An error occurred" });

    }
}

async function myCampaigns(req,res){
    const user= req.user;
    const userId=user._id;
    try{
    const User=await Campaign.find({userId});
    return res.json(User);
    }catch(error){
        res.status(500).json({error:"An error occurred"});
    }
};

async function editCampaign(req,res){

    const _id=req.params.campaignId;
    try{
        
    const campaignDetails=req.body;
    
    const updatedCampaign=await Campaign.findOneAndUpdate({_id},campaignDetails,{new:true});
    if(!updatedCampaign){
        res.status(404).json({error:"Edit NOT possible"});
    }
    else{
        
        return res.json(updatedCampaign);
    }
    }catch(error){
        res.status(500).json({error:"An error occurred"});
    }
    
}

async function deleteCampaign(req,res){
    const _id=req.params.campaignId;
    try{
        const user=req.user;
        const userId=user._id;
        const conditions={
            _id:_id,
            userId:userId,
        }
        console.log("conditions:",conditions);
        const deleteCampaign=await Campaign.findOneAndDelete(conditions);

        if(!deleteCampaign){
            res.status(404).json({error:"Campaign not found"});
        }
       else{
            res.json({message:"Campaign Deleted"});
        }
    }catch(error){
        res.status(500).json({error:"An error occurred"});
    }
}



module.exports={createCampaign,getCampaigns,getCampaign,myCampaigns,editCampaign,deleteCampaign}




