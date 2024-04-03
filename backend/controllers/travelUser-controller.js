const TravelUser = require("../models/TravelUser-model");





const reviewUserDetails = async (req, res) => {
    try {
        const { travelerFormData, placeName, startingDate, duration, totalCost } = req.body;

        const travelUserData = await TravelUser.create({ travelerFormData: travelerFormData, placeName: placeName, startingDate: startingDate, duration: duration, totalCost: totalCost });
        console.log(travelUserData);

        res.status(200).json({ msg: "successfull stored travel user details...", travelUserData })

    } catch (error) {
        console.log(error);
    }
}


module.exports = {reviewUserDetails };