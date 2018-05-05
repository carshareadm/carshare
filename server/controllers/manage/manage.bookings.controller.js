import Bookings from '../../models/booking';
import * as logger from '../../util/logger';


export const getAll = async (req, res) => {
  try {
    const bookings = await Bookings.find({})
      .populate('car user offer')
      .exec();

      return res.status(200).send(bookings);
  } catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
};

export const update = async (req, res) => {
  try {
    const booking = await Bookings.findById(req.params.bookingId).exec();
    
    if (booking === null) {
      return res.status(404).send('Booking not found');
    }

    booking.car = req.body.car;
    booking.startsAt = req.body.startsAt.toString();
    booking.endsAt = req.body.endsAt.toString();
    booking.user = req.body.user;
    booking.unlockCode = req.body.unlockCode;
    // No setting offers yet
    //booking.offer = offer._id;
    booking.isDisabled = req.body.isDisabled;
    
    const saved = await booking.save();
    return res.status(200).send(saved);

  } catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
};