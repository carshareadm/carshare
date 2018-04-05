const s3Helper = require('../../util/aws.helper');
const uuidv4 = require('uuid/v4');
const logger = require('../../util/logger');
const Image = require('../../models/image');


export const getPresignedPost = function(req, res) {
  const filename = req.body.filename;
  const chunks = filename.split('.');
  const extension = chunks[chunks.length - 1];
  const uuid = uuidv4();

  try {
    const uploadPolicy = s3Helper.getUploadPresignedKey(uuid + '.' + extension);
    res.status(200).send(uploadPolicy);
  }
  catch (e) {
    logger.error({message: 'generate upload policy failed', err: e});
    res.status(500).send(e);
  }
};

export const postImage = function(req, res) {
  const filename = req.body.filename;
  const img = new Image();
  img.filename = filename;
  img.save((err) => {
    if (err) {
      logger.err(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(img);
    }
  });
};