const jwt = require("jsonwebtoken");
const jwtSecret = process.env.SECRET_KEY_JWT;
const {getUser}=require("./auth");

function checkJwtCookie(req, res, next){
    const token = req.cookies.token;
  
    if (token) {
      try {
        const user = getUser(token);
        req.user = user; 
        next();
      } catch (err) {
        res.status(401).send({ msg: "Unauthorized"}); 
      }
    } else {
      res.status(401).send({ msg: "Token NOT provided" });
    }
  };

module.exports={checkJwtCookie};  