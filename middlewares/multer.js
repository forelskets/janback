const multer = require("multer");

const profileUploads = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

profile = profileUploads.single("profile");

const cardPhotoUploads = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/card-photo");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

cardPhoto = cardPhotoUploads.single("photoCardFile");

module.exports = {
  profile,
  cardPhoto,
};
