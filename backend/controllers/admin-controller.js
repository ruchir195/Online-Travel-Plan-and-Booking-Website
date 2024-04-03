const User = require("../models/User-model");
const PlaceDetail = require("../models/PlaceDetails-model")
const TravelerDetail = require("../models/TravelUser-model");
const Place = require("../models/Place-model");
const Comment = require("../models/Comment-model");
const path = require('path');
const fs = require('fs');

const showUser = async (req, res) => {
  try {
    const users = await User.find({});
    // console.log(users);

    res.status(200).json({ msg: "User data fetched successfully...", users });
  } catch (error) {
    console.log("Problem in fetching data...", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


const showEvent = async (req, res) => {
  try {
    const placeDetails = await PlaceDetail.find({});
    res.status(200).json({ msg: "eventDetails fetched successfully...", placeDetails });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}


const showTraveler = async (req, res) => {
  try {
    const travelerDetails = await TravelerDetail.find({});
    res.status(200).json({ msg: "TravelerDetails fetched successfully...", travelerDetails });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}



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


const showPlace = async (req, res) => {
  try {
    const selectedPlace = req.params.selectedPlace;

    if (selectedPlace) {
      const place = await Place.findOne({ placeName: selectedPlace });
      if (place) {
        res.status(200).send({ msg: "Show placeDetails successfully done", place });
      } else {
        res.status(404).send({ error: "PlaceDetails not found" });
      }
    } else {
      res.status(400).send({ error: "Bad request: No selectedPlace parameter provided" });
    }
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send({ error: "Internal server error" });
  }
}

const showPutPlace = async (req, res) => {
  try {
    const selectedPlace = req.params.selectedPlace;

    // Construct the update object with the fields to be updated
    const updateObject = {};

    if (req.body.placesName) {
      updateObject.placesName = req.body.placesName;
    }

    if (req.body.duration) {
      updateObject.duration = req.body.duration;
    }



    // Update place details in the database
    const updatedPlace = await Place.findOneAndUpdate(
      { placeName: selectedPlace }, // Filter condition
      updateObject, // Data to update
      { new: true } // Return the updated document
    );

    if (!updatedPlace) {
      return res.status(404).json({ error: 'Place not found' });
    }

    // Respond with the updated place details
    res.status(200).json({ message: 'Place details updated successfully', updatedPlace });
    console.log(updatedPlace);
  } catch (error) {
    console.error('Error updating place:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const showPlaceDetails = async (req, res) => {
  try {
    const selectedPlace = req.params.selectedPlace;

    if (selectedPlace) {
      const place = await PlaceDetail.findOne({ placeName: selectedPlace });
      if (place) {
        res.status(200).send({ msg: "Show place successfully done", place });
      } else {
        res.status(404).send({ error: "Place not found" });
      }
    } else {
      res.status(400).send({ error: "Bad request: No selectedPlace parameter provided" });
    }
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send({ error: "Internal server error" });
  }
}

const showPutPlaceDetails = async (req, res) => {
  try {
    const selectedPlace = req.params.selectedPlace;

    // Construct the update object with the fields to be updated
    const updateObject = {};

    if (req.body.placesName) {
      updateObject.placesName = req.body.placesName;
    }

    if (req.body.duration) {
      updateObject.duration = req.body.duration;
    }


    if (req.body.placeContent) {
      updateObject.placeContent = req.body.placeContent;
    }


    if (req.body.adultCost) {
      updateObject.adultCost = req.body.adultCost;
    }

    if (req.body.childCost) {
      updateObject.childCost = req.body.childCost;
    }


    if (req.body.seniorCost) {
      updateObject.seniorCost = req.body.seniorCost;
    }


    if (req.body.hotelName) {
      updateObject.hotelName = req.body.hotelName;
    }

    if (req.body.area) {
      updateObject.area = req.body.area;
    }

    if (req.body.dayFields) {
      updateObject.dayFields = req.body.dayFields;
    }

    if (req.body.placesFields) {
      updateObject.placesFields = req.body.placesFields;
    }

    // Update place details in the database
    const updatedPlace = await PlaceDetail.findOneAndUpdate(
      { placeName: selectedPlace }, // Filter condition
      updateObject, // Data to update
      { new: true } // Return the updated document
    );

    if (!updatedPlace) {
      return res.status(404).json({ error: 'Place not found' });
    }

    // Respond with the updated place details
    res.status(200).json({ message: 'Place details updated successfully', updatedPlace });
    console.log(updatedPlace);
  } catch (error) {
    console.error('Error updating place:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const showComment = async (req, res) => {
  try {
    const { userName, comment, rating } = req.body;

    // Check if req.file exists and is an image file
    let imageData = null;
    let imageName = null;

    console.log(rating);

    if (req.file && req.file.filename) {
      imageName = req.file.filename;
      imageData = {
        data: fs.readFileSync(path.join(__dirname, '../../frontend/src/ImagesUpload/', req.file.filename)),
        contentType: req.file.mimetype // Use the mimetype provided by multer
      };
    }

    const commentData = await Comment.create({
      userName,
      comment,
      image: imageData,
      imageName,
      rating
    });

    res.status(200).send({ msg: "Form successfully submitted", commentData });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};


const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    // Check if commentId is valid
    if (!commentId) {
      return res.status(400).json({ error: "Invalid comment ID" });
    }

    // Here you would implement your logic to delete the comment from your database
    const delcom = await Comment.findByIdAndDelete(commentId);

    // Assuming the comment has been successfully deleted
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }

}



const deletePlace = async (req, res) => {
  try {
    const { placeId } = req.params;

    // Check if commentId is valid
    if (!placeId) {
      return res.status(400).json({ error: "Invalid Place ID" });
    }

    // Here you would implement your logic to delete the comment from your database
    const delplace = await Comment.findByIdAndDelete(placeId);

    // Assuming the comment has been successfully deleted
    res.status(200).json({ message: "Place deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }

}





module.exports = { showUser, showEvent, showTraveler, eventPage, showPlace, showPutPlace, showPlaceDetails, showPutPlaceDetails, showComment, deleteComment, deletePlace }