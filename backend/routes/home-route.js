const express  = require("express");
const router = express.Router();
const HomeController = require("../controllers/home-controller");

router.route("/getComment").get(HomeController.getComment);


module.exports = router;