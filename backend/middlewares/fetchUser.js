const userSchema = require("../models/User-model");
var jwt = require('jsonwebtoken');


const fetchuser = (req,res,next) => {
    // Get the user from the JWT tocken and add id to req object
    const tocken = req.header('auth-tocken');
    console.log(tocken);
    if(!tocken){
        res.status(401).send({error: "Please authentication using valid tocken"});
    }
    try {
        const data = jwt.verify(tocken, JWT_SECRETE);
        // console.log(data);
        req.user = data.user;
        // console.log(req.user);
        next();
    } catch (error) {
        res.status(401).send({error: "Please authentication using valid tocken"});
    }
}

module.exports = fetchuser;