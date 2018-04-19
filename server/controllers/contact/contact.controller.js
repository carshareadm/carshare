import Enquiry from '../../models/enquiry';

const addEnquiry = function(req, res)
{
  let newEnquiry = new Enquiry({
    emailFrom: req.body.emailFrom,
    name: req.body.name,
    message: req.body.message,
    priority: req.body.priority,
  });

  newEnquiry
    .save()
    .then((enquiry) => {
      res.status(200).send(enquiry)
    })
    .catch((err) => {
      if (err.name === 'ValidationError')
      {
        res.status(400).send(err);
      } else {
        res.status(500).send(err)
      }
    })
}

module.exports = {
  addEnquiry: addEnquiry,
}
