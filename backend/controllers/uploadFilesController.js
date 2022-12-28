const { upload } = require("../common/helper");

exports.uploadImage = (req, res) => {
  res.json({
    url: `${upload.getDestination}` + upload.getFilename,
  });
};
