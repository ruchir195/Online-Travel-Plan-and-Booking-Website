const express  = require("express");
const router = express.Router();
const TravelUSerController = require("../controllers/travelUser-controller");


router.route("/reviewUserDetails").post(TravelUSerController.reviewUserDetails);




module.exports = router;