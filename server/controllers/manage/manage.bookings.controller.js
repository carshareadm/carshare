import Bookings from '../../models/booking';
import Car from "../../models/car";
import Offer from "../../models/offer";
import * as logger from '../../util/logger';

import moment from "moment"


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
    booking.offer = req.body.offer;
    booking.isDisabled = req.body.isDisabled;

    var hours = moment
          .duration(
            moment(booking.endsAt, "YYYY/MM/DD HH:mm").diff(
              moment(booking.startsAt, "YYYY/MM/DD HH:mm")
            )
          )
          .asHours();

    const vehicle = await Car.findById(req.body.car).populate("vehicleType").exec();

    if (vehicle === null) {
      return res.status(400).send('No such car');
    }

    booking.totalCost = hours * vehicle.vehicleType.hourlyRate;

    if (booking.offer)
          {
            // FindOne as Offer Codes are set as unique
            const discount = await Offer.findById(req.body.offer).exec();

            if (discount) {
              if(discount.isDisabled==false && moment(discount.expiresAt).isAfter(moment()))
              {
                booking.offer = discount._id;
                //Multiplier applied first
                if (discount.multiplier) {
                  booking.totalCost =
                    (100 - discount.multiplier)/100 * booking.totalCost;
                }
                if (discount.oneOffValue) {
                  booking.totalCost =
                  booking.totalCost - discount.oneOffValue;
                }
              }
            }
          }
    
    const saved = await booking.save();
    return res.status(200).send(saved);

  } catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
};

export const stats = async (req, res) => {
  try {
    const totalBookings = await Bookings.find({}).exec();
    const cancelledBookings = await Bookings.find({isDisabled: true}).exec();
    const now = new Date();
    const upcomingBookings = await Bookings.find({isDisabled: false})
      .where('startsAt').gt(now)
      .exec();
    const inProgressBookings = await Bookings.find({isDisabled: false})
      .where('startsAt').lt(now)
      .where('endsAt').gt(now)
      .exec();
  
    const results = {
      total: totalBookings.length,
      cancelled: cancelledBookings.length,
      upcoming: upcomingBookings.length,
      inProgress: inProgressBookings.length,
    }

    return res.status(200).send(results);
  }
  catch(e) {
    logger.err(e);
    return res.status(500).send(e);
  }
};
