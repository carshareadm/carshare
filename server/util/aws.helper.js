const AWS = require("aws-sdk");

const s3 = new AWS.S3({ region: "us-east-2" });

const privateBucket = "carshare-images";
const publicBucket = "carshare-public";

export const getUploadPresignedKey = function(key, isPublic) {
  const params = {
    Bucket: isPublic ? publicBucket : privateBucket,
    Fields: {
      key: key,
    },
  };
  return s3.createPresignedPost(params);
};

export const setPublicRead = function(key, cb) {
  const params = {
    Bucket: publicBucket,
    Key: key,
    ACL: 'public-read',
  };
  s3.putObjectAcl(params, function(err, data){
    if (err) {
      throw err;
    }
    else {
      cb();
    }
  });
}

// only need this for private bucket
export const getDownloadSignedUrl = function(key) {
  var params = { Bucket: privateBucket, Key: key };
  return s3.getSignedUrl("getObject", params);
};
