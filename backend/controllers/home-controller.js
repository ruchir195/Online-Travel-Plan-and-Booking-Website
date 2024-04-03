const Comment = require("../models/Comment-model");


const getComment = async (req,res) => {
    try {
        const commentData = await Comment.find({});
        // console.log(eventData);
        res.status(200).send({ msg: "Form successfully submitted", commentData });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send({ error: "Internal server error" });
    }
}




module.exports = {getComment} 