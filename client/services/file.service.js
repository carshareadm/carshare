/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/25
 * Authors
 *               - Paul Crow
 */
import * as http from '../util/http';

export const getPresignedUploadKey = (fileName, isPublic) => {
  return http.client().post('images/presigned', { filename: fileName, isPublic: isPublic});
};

export const uploadToStorage = (file, s3UploadPolicy) => {
  const headers = {'Content-Type': 'multipart/form-data'};
  const formData = new FormData();
  const fieldKeys = Object.keys(s3UploadPolicy.fields);
  
  // the order the fields are added to the form data is important. AWS S3 expects 'key' as the 
  // first form data field... it is the first key in the policy.fields, so ok to iterate normally
  // but file must be appended after policy fields
  fieldKeys.forEach(key => formData.append(key, s3UploadPolicy.fields[key]));
  
  formData.append('file', file);

  return http.clientNoAuthHeader(headers).post(s3UploadPolicy.url, formData);
};

export const saveImageToShaCarDb = (filename, isPublic) => {
  return http.client().post('images/', {filename: filename, isPublic: isPublic});
};