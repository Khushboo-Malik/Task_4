require("dotenv").config();

const nodemailer=require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET);
OAuth2_client.setCredentials({ refresh_token:process.env.REFRESH_TOKEN});

function send_mail_registration(Email) {
    const accessToken = OAuth2_client.getAccessToken();
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type:"OAuth2",
            user:"mail.khushboomalik@gmail.com",
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken,
        },
    });
    const mail_options = {
        from: `Khushboo Malik <${"mail.khushboomalik@gmail.com"}`,
        to: Email,
        subject: "Registration",
        text:"Registration Successfull!",
    }
    transport.sendMail(mail_options, function (error, result) {
        if (error) {
            console.log("error:", error);
        } else {
            console.log("Success:", result);
        }

        transport.close();
    });
}

function send_mail_payment(Email) {
    const accessToken = OAuth2_client.getAccessToken();
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type:"OAuth2",
            user:"mail.khushboomalik@gmail.com",
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken,
        },
    });
    const mail_options = {
        from: `Khushboo Malik <${"mail.khushboomalik@gmail.com"}`,
        to: Email,
        subject: "Donation",
        text:"Payment Successfull",
    }
    transport.sendMail(mail_options, function (error, result) {
        if (error) {
            console.log("error:", error);
        } else {
            console.log("Success:", result);
        }

        transport.close();
    });
}
module.exports={send_mail_registration,send_mail_payment};