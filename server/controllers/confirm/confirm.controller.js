/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 */
const ConfirmationCode = require('../../models/confirmationCode');

const codeTypeEnum = ["Register", "AccountUpdate"];

export const verifyCode = (req, res) => {
  const code = req.body.code;
  const codeType = req.body.codeType;

  if (codeTypeEnum.indexOf(codeType) < 0) {
    return res.status(400).send('Invalid code type: ' + codeType);
  }
  ConfirmationCode.findOne({
    user: req.userId,
    codeType: codeType,
    code: code,
  }).populate('user')
  .exec((err, confirmationCode) => {
    if (err || !confirmationCode) {
      return res.status(404).send('Code not found');
    }
    const now = new Date();
      if (now > confirmationCode.expiresAt) {
        return res.status(400).send('Code has expired');
      }
      if (codeType === codeTypeEnum[0]) {
        confirmationCode.user.isAccountConfirmed = true;
        confirmationCode.user.save()
          .then(() => res.status(200).send())
          .catch(e => res.status(500).send(e));
      }
      else {
        return res.status(200).send()
      }
  });
};