import User from "../../models/user";

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

module.exports = {
  getMyProfile: getMyProfile,
};

const updateMyProfile = function(req, res) {
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

module.exports = {
  getMyProfile: getMyProfile,
  updateMyProfile: updateMyProfile,
};
