const Place = require("../models/Place-model");
const PlaceDetail = require("../models/PlaceDetails-model");
const path = require('path');
const fs = require('fs');


const event = async (req, res) => {
    try {
        const { placeName, placesName, duration } = req.body;

        // Check if req.file exists and is an image file
        if (!req.file || !req.file.filename) {
            return res.status(400).send({ msg: "No image file provided" });
        }

        const imageName = req.file.filename;

        console.log(req.file.filename);
        const imageData = {
            data: fs.readFileSync(path.join(__dirname, '../../frontend/src/ImagesUpload/', req.file.filename)),
            contentType: req.file.mimetype // Use the mimetype provided by multer
        };

        const eventData = await Place.create({
            
            placeName,
            placesName,
            duration,
            image: imageData,
            imageName
        });

        // console.log(eventData);
        res.status(200).send({ msg: "Form successfully submitted", eventData });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send({ error: "Internal server error" });
    }
};



const eventPage = async (req, res) => {
    try {
        const eventData = await Place.find({});
        // console.log(eventData);
        res.status(200).send({ msg: "Form successfully submitted", eventData });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send({ error: "Internal server error" });
    }
};


const place = async (req, res) => {
    try {
        const { placeName, placeContent, duration, price, greeting, age, hotelName, hotelRating, area, placesName } = req.body;

        if (!req.files || !req.files.img2 || !req.files.img3 || !req.files.img4 || !req.files.img5) {
            return res.status(400).send({ msg: "No image file provided" });
        }

        const img2Name = req.files.img2[0].filename;
        const img3Name = req.files.img3[0].filename;
        const img4Name = req.files.img4[0].filename;
        const img5Name = req.files.img5[0].filename;
        
        const img2Data = {
            data: fs.readFileSync(path.join(__dirname, '../../frontend/src/ImagesUpload/', req.files.img2[0].filename)),
            contentType: req.files.img2[0].mimetype // Use the mimetype provided by multer       
        };

        const img3Data = {
            data: fs.readFileSync(path.join(__dirname, '../../frontend/src/ImagesUpload/', req.files.img3[0].filename)),
            contentType: req.files.img3[0].mimetype // Use the mimetype provided by multer       
        };

        const img4Data = {
            data: fs.readFileSync(path.join(__dirname, '../../frontend/src/ImagesUpload/', req.files.img4[0].filename)),
            contentType: req.files.img4[0].mimetype // Use the mimetype provided by multer       
        };

        const img5Data = {
            data: fs.readFileSync(path.join(__dirname, '../../frontend/src/ImagesUpload/', req.files.img5[0].filename)),
            contentType: req.files.img5[0].mimetype // Use the mimetype provided by multer       
        };


        const placeData = await PlaceDetail.create({
            placeName,
            placesName,
            duration,
            placeContent,
            price,
            greeting,
            age,
            hotelName,
            hotelRating,
            area,
            img2: img2Data,
            img3: img3Data,
            img4: img4Data,
            img5: img5Data,
            img2Name,
            img3Name,
            img4Name,
            img5Name
        });

        // console.log(eventData);
        res.status(200).send({ msg: "Form successfully submitted", placeData });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send({ error: "Internal server error" });
    }
}    


const placePage = async (req, res) => {
    try {

        const placeName = req.params.placeName;
        console.log("placeName : ",req.params.placeName);
        const placeData = await PlaceDetail.findOne({placeName});
        // console.log(placeData);
        res.status(200).send({ msg: "Form successfully submitted", placeName, placeData });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send({ error: "Internal server error" });
    }
};

module.exports = {event,eventPage, place, placePage};
