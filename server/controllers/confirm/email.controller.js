const User = require('../../models/user');
const ConfirmationCode = require('../../models/confirmationCode');
const email = require('../../util/email.helper');
const codeGenerator = require('../../util/code.generator');
const dateHelper = require('../../util/date.helper');

const codeTypeEnum = ["Register", "AccountUpdate"];

export const generateConfirmSms = (req, res) => {
  const codeType = req.body.codeType;
  const userId = req.userId;

  if (codeTypeEnum.indexOf(codeType) < 0) {
    res.status(400).send('unknown code type: [' + codeType + ']');
  } else {
    User.findById(userId)
      .then(user => {
        const code = new ConfirmationCode();
        code.codeType = codeType;
        code.code = codeGenerator.generate();
        code.expiresAt = dateHelper.addHours(new Date(), 0.1667);
        code.user = user;

        code.save()
          .then(() => {
            // always return a 200 - we should give them a way to request a new code if not received
            try {
              email.sendConfirmAccountUpdateEmail(user.email, code.code);
              res.status(200).send();
            } catch (e) {
              console.log(e);
              res.status(200).send();
            }
          })
          .catch(saveErr => {
            console.log(saveErr);
            res.status(500).send('failed to save confirmation code');
          });
      })
      .catch(userErr => {
        console.log(userErr);
        res.status(404).send('user not found');
      });
  }

};