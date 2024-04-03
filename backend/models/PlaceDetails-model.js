const mongoose = require("mongoose");



const placeDetailSchema = new mongoose.Schema({
    placeName:{
        type: String,
        required: true
    },
    placeContent: {
        type: String,
        required: true
    },

    adultCost : {
        type: String,
        require: true
    },
    childCost: {
        type: String,
        require: true
    },
    // seniorCost: {
    //     type: String,
    //     require: true
    // },
    flight:{
        type: String,
        required: true
    },
    rflight:{
        type: String,
        required: true
    },
    placesDetails: {
        type: [{
        placesInfo: {
            type: String,
            required: true,
          }, 
        }],
        required: true, // Ensure the entire placesInfo array is required
    },
    dayDetails: {
        type: [{
          details: {
            type: String,
            required: true,
          },
        }],
        required: true, // Ensure the entire dayDetails array is required
      },
    duration:{
        type: String,
        required: true
    },
    hotelName: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    placesName: {
        type: String,
        required: true
    },
    img2:
    {
        data: Buffer,
        contentType: String
    },
    img3:
    {
        data: Buffer,
        contentType: String
    },
    img4:
    {
        data: Buffer,
        contentType: String
    },
    img5:
    {
        data: Buffer,
        contentType: String
    },
    img2Name:{
        type: String,
        required: true
    },
    img3Name:{
        type: String,
        required: true
    },
    img4Name:{
        type: String,
        required: true
    },
    img5Name:{
        type: String,
        required: true
    },
    placeID:{
        type: String
    }
})

const PlaceDetail = new mongoose.model("PlaceDetail", placeDetailSchema);

module.exports = PlaceDetail;