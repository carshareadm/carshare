const User = require('../../models/user');
const License = require('../../models/license');
const Image = require('../../models/image');
const s3Helper = require('../../util/aws.helper');
const ObjectId = require('mongoose').ObjectId;

export const getById = (req, res) => {
  License.findById(req.params.id)
          .populate('image')
          .exec((err, license) => {
            if (err) {
              res.status(404).send();
            }
            else {
              let url = null;
              const data = {
                id: license.id,
                licenseNumber: license.licenseNumber,
              };
              if (license.image) {
                try{
                  url = s3Helper.getDownloadSignedUrl(license.image.filename)
                  data.imageId = license.image.id;
                  data.imageUrl = url;
                  res.status(200).send(data);
                }
                catch(e) {
                  res.status(500).send(e);
                }
              }
              else {
                res.status(200).send(data);
              }
            }
         });
};

export const updateLicenseImage = (req, res) => {
  License.findById(req.params.id, (err, license) => {
    if(err) {
      res.status(404).send();
    }
    else {
      license.image = req.body.imageId;
      license.save((saveErr) => {
        if(saveErr) {
          res.status(500).send(saveErr);
        }
        else {
          res.status(200).send();
        }
      })
    }
  });
};

export const updateLicenseNumber = (req, res) => {
  License.findById(req.params.id, (err, license) => {
    if(err) {
      res.status(404).send();
    }
    else {
      license.licenseNumber = req.body.licenseNumber;
      license.save((saveErr) => {
        if(saveErr) {
          res.status(500).send(saveErr);
        }
        else {
          res.status(200).send();
        }
      })
    }
  });
};