const Contribution= require("../models/contribution");

async function contributeCampaign(req,res){
    const campaignID=req.params.campaignId;
    
    try{
        
        const user=req.user;
        const name=user.name;
        const userID=user._id;
        const body=req.body;
        const contribution=await Contribution.findOne({userID,campaignID});
        if(!contribution){
            const contribution=await Contribution.create({
                campaignID:campaignID,
                name:name,
                userID:userID,
                amount:parseFloat(body.amount),
                payments:[parseFloat(body.amount)],
        });
             
        }
        else{
            contribution.amount+=parseFloat(body.amount);
            contribution.payments.push(parseFloat(body.amount));
            await contribution.save();     
        } 
        return res.json("New contribution added!"); 
    }catch(error){
        res.status(500).json({error:"An error occurred"});
    }; 
}     

async function campaignContributors(req,res){
    const campaignId=req.params.campaignId;
    
    try{
        const campaign=await Contribution.find({campaignID:campaignId});
        
        if(!campaign){
            res.status(404).json({error:"No contribution found"});
        }
        else{
            return res.json(campaign);
        }    
    }catch(error){
            res.status(500).json({error:"An error occurred"});
    }    
}

module.exports={contributeCampaign,campaignContributors};

    
    

