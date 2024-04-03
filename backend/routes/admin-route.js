const express  = require("express");
const router = express.Router();
const AdminController = require("../controllers/admin-controller");
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const directoryPath = "../frontend/src/ImagesUpload/";
      cb(null, directoryPath);
    },
    filename: (req, file, cb) => {
      const filename = file.originalname;
      cb(null, filename);
    }
  });

  var upload = multer({ storage: storage });

router.route("/showUser").get(AdminController.showUser);
router.route("/showEvent").get(AdminController.showEvent);
router.route("/showTraveler").get(AdminController.showTraveler);
router.route("/admin").get(AdminController.eventPage);
router.route("/:selectedPlace").get(AdminController.showPlace);
router.route("/:selectedPlace").put(AdminController.showPutPlace);
router.route("/placeDetails/:selectedPlace").get(AdminController.showPlaceDetails);
router.route("/placeDetails/:selectedPlace").put(AdminController.showPutPlaceDetails);
router.route("/comment").post(upload.single('image'), AdminController.showComment);
router.route("/deleteComment/:commentId").delete(AdminController.deleteComment);
router.route("/deletePlace/:placeId").delete(AdminController.deletePlace);

module.exports = router;