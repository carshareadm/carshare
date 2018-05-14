const s3Helper = require('../../util/aws.helper');
const uuidv4 = require('uuid/v4');
import * as logger from '../../util/logger';
const Image = require('../../models/image');


export const getPresignedPost = function(req, res) {
  const filename = req.body.filename;
  const chunks = filename.split('.');
  const extension = chunks[chunks.length - 1];
  const uuid = uuidv4();

  try {
    const uploadPolicy = s3Helper.getUploadPresignedKey(uuid + '.' + extension, req.body.isPublic);
    res.status(200).send(uploadPolicy);
  }
  catch (e) {
    logger.err({message: 'generate upload policy failed', err: e});
    res.status(500).send(e);
  }
};

export const postImage = function(req, res) {
  const filename = req.body.filename;
  const isPublic = req.body.isPublic;

  const img = new Image();
  img.filename = filename;
  img.isPublic = isPublic;
  img.save((err) => {
    if (err) {
      logger.err(err);
      return res.status(500).send(err);
    } else {
      try{
        if (isPublic) {
          s3Helper.setPublicRead(img.filename, () => res.status(200).send(img.toObject()));
        }
      }
      catch(e) {
        logger.err(e);
        return res.status(500).send(e);
      }

    }
  });
};
