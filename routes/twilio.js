const router = require("express").Router();

const { verifyTokenAndAdmin } = require('./verifyToken');


router.post("/",verifyTokenAndAdmin,async(req,res)=>{
    console.log(req.body);
    // const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const accountSid="ACa4af5937ddf2cdb2d990539dafaf7904"
    // const authToken = process.env.TWILIO_AUTH_TOKEN;
    const authToken="5fdb885c07ef2ec1402f1c3ddfd4deff"
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
