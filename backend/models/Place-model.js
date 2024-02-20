const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    placeName: {
        type: String,
        require: true
    },
    placesName:{
        type: String,
        require: true
    },
    duration:{
        type: String,
        require: true
    },
    image:
    {
        data: Buffer,
        contentType: String
    },
    imageName:{
        type: String,
        require: true
    },
})

const Place = new mongoose.model("Place", placeSchema);

module.exports = Place;