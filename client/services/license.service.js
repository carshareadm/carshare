import * as http from '../util/http';

export const updateImageDetails = function(licenseId, imageId) {
  return http.client().put('/license/'+licenseId+'/image', {imageId: imageId});
};