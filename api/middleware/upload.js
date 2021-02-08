const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

var upload = multer ({
  storage: storage,
  fileFilter: (req, file, callback) => {
      console.log(file);
    if (file.mimetype == "image/jpg" || file.mimetype == "image/png") {
      callback(null, true);
    } else {
      console.log("only jpg and png files are supported");
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});


module.exports = upload