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
    duration:{
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    greeting:{
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    hotelName: {
        type: String,
        required: true
    },
    hotelRating:{
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
})

const PlaceDetail = new mongoose.model("PlaceDetail", placeDetailSchema);

module.exports = PlaceDetail;