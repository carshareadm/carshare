const AWS = require("aws-sdk");

const s3 = new AWS.S3({ region: "us-east-2" });

const bucketName = "carshare-images";

export const getUploadPresignedKey = function(key) {
  const params = {
    Bucket: bucketName,
    Fields: {
      key: key,
    },
  };
  return s3.createPresignedPost(params);
};

export const getDownloadSignedUrl = function(key) {
  var params = { Bucket: bucketName, Key: key };
  return s3.getSignedUrl("getObject", params);
};
