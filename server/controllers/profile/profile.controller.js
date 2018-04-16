import User from "../../models/user";
import Address from "../../models/address";
import License from "../../models/license";

const getMyProfile = function(req, res) {
  User.findById(req.userId)
    .populate("-confirmationCodes -__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send(err);
      } else if (!user) {
        res.status(404).send();
      } else {
        res.status(200).send(user);
      }
    });
};

const updateMyProfile = function(req, res) {

  const user = req.body.user;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const licenseNumber = req.body.license;
  const password = req.body.password;
  const street1 = req.body.street1;
  const street2 = req.body.street2;
  const suburb = req.body.suburb;
  const state = req.body.state;
  const postCode = req.body.postCode;

  var changeCnt = 0;

  User.findById(user)
    .exec((usrErr, userFound) => {
      if (usrErr) {
        res.status(500).send(usrErr);
      } else if (!userFound) {
        res.status(404);
      } else {
        if ((user || email || mobile || licenseNumber || password || street1 || street2 || suburb || state || postCode)===false)
        {
          // No fields sent, Bad request
          res.status(401);
        }
        if(email && (!mobile && !password))
        {
          userFound.email=email;
          changeCnt+1;
        }
        if(mobile && (!email && !password))
        {
          userFound.mobile=mobile;
          changeCnt+1;
        }
        if(password && (!email && !mobile))
        {
          userFound.password=password;
          changeCnt+1;
        }
        if(licenseNumber)
        {
          userFound.License.licenseNumber=licenseNumber;
          userFound.License.save((licenseUpdErr, savedLic) => {
            if (licenseUpdErr) {
              res.status(500).send(licenseUpdErr);
            }
          });
          changeCnt+1;
        }
        // Address component update
        if(street1 || street2 || suburb || state || postCode)
        {
          if(street1)
          {
            userFound.Address.street1=street1;
          }
          if(street2)
          {
            userFound.Address.street2=street2;
          }
          if(suburb)
          {
            userFound.Address.suburb=suburb;
          }
          if(state)
          {
            userFound.Address.state=state;
          }
          if(postCode)
          {
            userFound.Address.postCode=postCode;
          }
          var addressErr = userFound.Address.validateSync();
          if(addressErr)
          {
            res.status(500).send(addressErr);
          }
          userFound.Address.save((addressUpdErr, savedAdd) => {
            if (addressUpdErr) {
              res.status(500).send(addressUpdErr);
            }
          });
          changeCnt+1;          
        }
        if(changeCnt>0)
        {
          usrChkErr = userFound.validateSync();
          if(usrChkErr)
          {
            res.status(500);
          }
          else
          {
            userFound.save((usrUpdErr,savedUsr) => {
              if(usrUpdErr)
              {
                res.status(500).send(usrUpdErr);
              }
              else{
                res.status(200).send(savedUsr);
              }
            });
          }
        }
        else
        {
          res.status(401);
        }
      }
    });
};

module.exports = {
  getMyProfile: getMyProfile,
  updateMyProfile: updateMyProfile,
};
