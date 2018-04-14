const ConfirmationCode = require('../../models/confirmationCode');

const codeTypeEnum = ["Register", "AccountUpdate"];

export const verifyCode = (req, res) => {
  const code = req.body.code;
  const codeType = req.body.codeType;

  if (codeTypeEnum.indexOf(codeType) < 0) {
    res.status(400).send('Invalid code type: ' + codeType);
  }
  else {
    ConfirmationCode.findOne({
      user: req.userId,
      codeType: codeType,
      code: code,
    }).populate('user')
    .exec((err, confirmationCode) => {
      if (err || !confirmationCode) {
        res.status(404).send('Code not found');
      }
      else {
        const now = new Date();
        if (now > confirmationCode.expiresAt) {
          res.status(400).send('Code has expired');
        }
        else {
          if (codeType === codeTypeEnum[0]) {
            confirmationCode.user.isAccountConfirmed = true;
            confirmationCode.user.save()
              .then(() => res.status(200).send())
              .catch(e => res.status(500).send(e));
          }
          else {
            res.status(200).send()
          }
        }
      }
    });
  }

};