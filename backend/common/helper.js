const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.route.path.includes("products")
      ? "products-images"
      : "categoriesImeges";

    cb(null, `../frontend/angular/src/assets/${folder}`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

exports.upload = multer({ storage });
