const upload = require("../controllers/images/upload.controller");
const isAuthenticatedGuard = require("../middleware/isAuthenticatedGuard");
var express = require("express");
var router = express.Router();

/**
 * @typedef PresignedUploadPolicyModel
 * @property {string} key
 * @property {string} bucket
 * @property {string} "X-Amz-Algorithm"
 * @property {string} 'X-Amz-Credential'
 * @property {string} 'X-Amz-Date'
 * @property {string} Policy
 * @property {string} 'X-Amz-Signature'
 */

/**
 * @typedef PresignedUploadResponseModel
 * @property {string} url
 * @property {PresignedUploadPolicyModel.model} fields
 */

/**
 * @typedef PresignedUploadRequestModel
 * @property {string} filename.required
 */

/**
 * @typedef ImageSaveModel
 * @property {string} filename.required
 * @property {boolean} isPublic.required
 */

/**
 * generate prerequeisites to securely upload a file to a private AWS S3 bucket.
 * prerequisites include headers and a signed url.
 * @route POST /images/presigned
 * @group images
 * @param {PresignedUploadRequestModel.model} presignedUploadRequestModel.body.required
 * @returns {PresignedUploadResponseModel.model} 200 
 * @returns {Error} 500 - internal server error
 */
router.post("/presigned", isAuthenticatedGuard, upload.getPresignedPost);

/**
 * save an image record in the database after successfully uploading to AWS S3.
 * if file is meant to be public, also makes request to AWS to update file permissions.
 * an example of a public image is a Car image.
 * an example of a private image is a License image.
 * @route POST /images
 * @group images
 * @param {ImageSaveModel.model} ImageSaveModel.body.required
 * @returns {object} 200 - the image object
 * @returns {Error} 500 - internal server error
 */
router.post("", isAuthenticatedGuard, upload.postImage)

module.exports = router;