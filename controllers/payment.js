require("dotenv").config();
const Razorpay=require("razorpay");
const Contribution= require("../models/contribution");
const{send_mail_payment}=require("./mail");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

async function payment(req,res){
    try{const campaignId=req.body.campaignId;
        const user=req.user;
        const userID=user._id; 
        const email=user.email;
        const contribution=await Contribution.findOne({userID,campaignId});
        const updatedContribution = await Contribution.findOneAndUpdate({userID,campaignId},{currency:"INR"},{new:true});
        if(!contribution){
            return res.status(404).send("No such campaign exists");
        };
        
        const Amount=contribution.amount;
        const amount = Amount*100;
        const options = {
            amount: amount,
            currency: "INR",
            receipt: "razorUser@gmail.com",
            payment_capture: 1, 
        };

        razorpayInstance.orders.create(options, 
            (err, order)=>{
                if(!err){
                    res.status(200).send({
                        success:true,
                        msg:"Order Created",
                        order_id:order.id,
                        amount:amount,
                        key_id:process.env.RAZORPAY_ID,
                        contact:"9256992345",
                        name: "Khushboo Malik",
                        email: email,
                    });
                send_mail_payment(email);    
                }
                else{
                    res.status(400).send({success:false,msg:"Something went wrong!"});
                }
            }
        );

    } catch (error) {
        console.log(error.message);
    }
}

module.exports={payment};







