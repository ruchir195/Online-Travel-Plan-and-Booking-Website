const express  = require("express");
const router = express.Router();
const placeController = require("../controllers/place-controller");
const multer = require('multer');
const fetchUser = require("../middlewares/fetchUser")
const path = require('path');
const fs = require('fs');

// var storage = multer.diskStorage({
    
//     destination: (req, file, cb) => {
//         const directoryPath = "../frontend/src/ImagesUpload/";
//         cb(null, directoryPath)
//     },
//     filename: (req, files, cb) => {
//         cb(null, files.fieldname + '-' + Date.now())
//     }
// });

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
var uploadMultiple = upload.fields([{ name: 'img2' }, { name: 'img3' }, { name: 'img4' }, { name: 'img5' }])

router.route("/event").post( upload.single('image'), placeController.event);
router.route("/event").get( placeController.eventPage);
router.route("/placeDetails").post( uploadMultiple, placeController.place);
router.route("/placeDetails/:placeName").get( placeController.placePage);

module.exports = router;