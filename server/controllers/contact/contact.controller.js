import Enquiry from '../../models/enquiry';
import * as email from '../../util/email.helper';

export async function addEnquiry(req, res)
{
  const newEnquiry = new Enquiry({
    emailFrom: req.body.emailFrom,
    name: req.body.name,
    message: req.body.message,
    priority: req.body.priority,
  });

  try
  {
    const savedEnquiry = await newEnquiry.save();
    const emailFrom = savedEnquiry.emailFrom;
    const message = savedEnquiry.message;
    const name = savedEnquiry.name;

    try {
      await email.sendEnquiryCopyEmails(savedEnquiry);
    } catch (e) {
      console.log(e);
    }
    return res.status(200).send(savedEnquiry)
  }
  catch (e)
  {
    console.log(e);
    if (e.name === 'ValidationError')
    {
      return res.status(400).send(e);
    }
    else
    {
      return res.status(500).send(e)
    }
  }
}
