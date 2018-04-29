const s3Helper = require("../../util/aws.helper");
const logger = require("../../util/logger");
const User = require("../../models/user");
const Image = require('../../models/image');

const signedUrl = (fileName) => {
  return s3Helper.getDownloadSignedUrl(fileName);
};

export const getImageById = function(req, res) {
  Image.findById(req.body.imageId, (imgErr, image) => {
    if (imgErr) {
      logger.error(imgErr);
      res.status(500).send(imgErr);
    }
    else {
      try {
        const url = signedUrl(image.fileName);
        res.status(200).send({imageUrl: url});
      } catch(e) {
        logger.error(e);
        res.status(500).send(e);
      }
    }
  });
};
