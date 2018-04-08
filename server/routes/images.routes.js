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
 * @route POST /images/presigned
 * @group images
 * @param {PresignedUploadRequestModel.model} presignedUploadRequestModel.body.required
 * @returns {PresignedUploadResponseModel.model} 200 
 * @returns {Error} 401 - user not authenticated
 * @returns {Error} 500 - internal server error
 */
router.post("/presigned", isAuthenticatedGuard, upload.getPresignedPost);

router.post("", isAuthenticatedGuard, upload.postImage)

module.exports = router;