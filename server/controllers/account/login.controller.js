import User from "../../models/user";

exports.login = function(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .select("+password")
    .exec((err, user) => {
      if (err ) {
        res.status(401).send("Username or password did not match");
      } else if (!user) {
        res.status(401).send("Username or password did not match");
      } else {        
        let match = user.comparePassword(password, (error, isMatch) => {
          if (error || !isMatch) {
            res.status(401).send("Username or password did not match");
          }
          res.status(200).send(); // TODO: JWT
        });
      }
    });
};
