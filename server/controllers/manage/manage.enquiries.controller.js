import Enquiries from '../../models/enquiry';
import * as email from '../../util/email.helper';
import * as DateUtil from '../../util/date.helper';
import * as logger from '../../util/logger';

export const getFiltered = async (req, res) => {
  // default filter: enquiries without response datetime stamp
  // FUTURE: more filter options
  try
  {
    const enquiries = await Enquiries
    .find({responseAt: null})
    .sort('-receivedAt')
    .exec();

    return res.status(200).send(enquiries);
  }
  catch (e)
  {
    logger.err(e);
    return res.status(500).send(e);
  }
};

export const update = async (req, res) => {
  try {
    const enquiry = await Enquiries.findById(req.params.enquiryId).exec();

    if (!enquiry) {
      let e = Error(`Enquiry id ${req.params.enquiryId} not found.`);
      e.name = 'NotFoundError';
      throw e;
    }

    enquiry.response = req.body.response;
    enquiry.responseAt = Date.now();

    const saved = await enquiry.save();
    try
    {
      await email.sendEnquiryResponseEmail(saved);
    }
    catch (e)
    {
      logger.err(e)
    }
    return res.status(200).send(saved);
  }
  catch (e)
  {
    logger.err(e);
    switch (e.name)
    {
      case 'ValidationError':
        return res.status(400).send(e);
        break;
      case 'NotFoundError':
        return res.status(404).send(e);
        break;
      default:
        return res.status(500).send(e);
    }
  }

};

export const stats = async (req, res) => {
  try {
    const totalEnquiries = await Enquiries.find({}).exec();
    const resolved = totalEnquiries.filter(f => f.responseAt && f.responseAt !== null);
    const now = new Date();
    const yesterday = DateUtil.addHours(now, -24);
    const sevenDaysAgo = DateUtil.addHours(now, -24 * 7);
    const last24Hours = totalEnquiries.filter(f => f.receivedAt >= yesterday);
    const last7Days = totalEnquiries.filter(f => f.receivedAt >= sevenDaysAgo);

    const results = {
      total: totalEnquiries.length,
      resolved: resolved.length,
      last24Hours: last24Hours.length,
      last7Days: last7Days.length,
    }

    return res.status(200).send(results);
  }
  catch(e) {
    console.log(e);
    logger.err(e);
    return res.status(500).send(e);
  }
};
