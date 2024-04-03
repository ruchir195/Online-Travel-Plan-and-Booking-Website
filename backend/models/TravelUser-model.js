const mongoose = require("mongoose");

const travelUserSchema = new mongoose.Schema({
    travelerFormData: {
        type: String,
        require: true
    },
    placeName:{
        type: String,
        require: true
    },
    startingDate:{
        type: Date,
        require: true
    },
    duration: {
        type: String,
        require: true
    },
    totalCost: {
        type: String,
        require: true
    }
})

const TravelUser = new mongoose.model("TravelUser", travelUserSchema);

module.exports = TravelUser;