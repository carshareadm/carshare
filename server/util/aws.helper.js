const AWS = require("aws-sdk");

const s3 = new AWS.S3({ region: "us-east-2" });

const bucketName = "carshare-images";

export const bucketList = function() {
  s3.listBuckets({}, function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    } else {
      console.log(data); // successful response
    }
  });
};

export const blobList = function() {
  s3.listObjects({ Bucket: bucketName }, function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    } else {
      console.log(data); // successful response
    }
  });
};

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
