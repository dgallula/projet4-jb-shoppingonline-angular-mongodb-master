const { urlConfig } = require("../common/config");
const { upload } = require("../common/helper");

module.exports = (app) => {
  const uploadFile = require("../controllers/uploadFilesController");
  app.post(
    `${urlConfig}/category-image`,
    upload.single("file"),
    uploadFile.uploadImage
  );

  app.post(
    `${urlConfig}/products-image`,
    upload.single("file"),
    uploadFile.uploadImage
  );
};
