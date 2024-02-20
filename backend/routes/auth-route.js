const express  = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");


router.route("/").get(authController.home);
router.route("/home").get(authController.home);
router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/otpVerification").post(authController.otpVerification);
router.route("/confirmPassword").post(authController.confirmPassword);
// router.route("/event").post(authController.event);
// router.route("/auth/google").get(authController.googleCheck);
// router.route("/auth/google/").get(authController.googleLogin);


module.exports = router;