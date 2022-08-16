const router = require("express").Router();

const { verifyTokenAndAdmin } = require('./verifyToken');


router.post("/",verifyTokenAndAdmin,async(req,res)=>{
    console.log(req.body);
    // const accountSid = process.env.TWILIO_ACCOUNT_SID;
 
    // const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    client.messages
    .create({
       body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
       from: '+19705924312',
       to: '+917702436070'
     })
    .then(message => console.log("msg sent"));

})
module.exports=router;
