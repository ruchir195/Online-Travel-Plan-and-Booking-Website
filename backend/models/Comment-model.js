const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    comment: {
        type: String,
        require: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    imageName:{
        type: String,
        require: true
    },
    rating: {
        type: String,
    }
})

const Comment = new mongoose.model("Comment", commentSchema);

module.exports = Comment;