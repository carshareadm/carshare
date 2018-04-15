import * as http from '../util/http';

export const VerificationTypes = {
  SMS: 'sms',
  EMAIL: 'email',
};

export const CodeTypes = {
  REGISTER: 'Register',
  ACCOUNT_UPDATE: 'AccountUpdate',
};

export const requestConfirmationCode = (verificationMethod, codeType) => {
  return http.client().post(`/confirm/${verificationMethod}`, {codeType: codeType});
};

export const confirmWithCode = (code, codeType) => {
  return http.client().post("/confirm", {code: code, codeType: codeType})
};