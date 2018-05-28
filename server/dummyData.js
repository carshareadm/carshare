/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/28
 * Authors
 *               - Paul Crow
 *               - Inga Pflaumer
 *               - Tianqi Chen
 *               - Jason Koh
 */
import Address from "./models/address";
import Booking from "./models/booking";
import Car from "./models/car";
import ConfirmationCode from "./models/confirmationCode";
import Coordinate from "./models/coordinate";
import CreditCard from "./models/creditCard";
import Damage from "./models/damage";
import Enquiry from "./models/enquiry";
import Image from "./models/image";
import License from "./models/license";
import Location from "./models/location";
import Movement from "./models/movement";
import User from "./models/user";
import Offer from "./models/offer";
import VehicleType from "./models/vehicleType";

import moment from "moment";
import DateUtils from './util/date.helper';

module.exports = async () => {
  console.log("DB: Start loading seed data");

  const errorCode1 = 11000;
  const errorCode2 = 11001;
  let user1 = null;

  User.count({}, (err, count) => {
    if (count < 1) {
      console.log("Adding users...");

      user1 = new User();
      user1.email = "carshareadm@gmail.com";
      user1.mobile = "0412345678";
      user1.password = "shacar";
      user1.isAdmin = true;
      user1.isDisabled = false;
      user1.isBlockedByAdmin = false;
      user1.save({}).catch(function(err) {
        console.log(err);
      });

      //TestUsers

      let user2 = new User();
      user2.email = "user1@test.com";
      user2.mobile = "0411111111";
      user2.password = "user1";
      user2.isDisabled = false;
      user2.isBlockedByAdmin = false;

      //User2 license block
      let licenseU2 = new License();
      licenseU2.licenseNumber = "ABC123456";
      licenseU2.isDisabled = false;
      licenseU2.approvedByAdmin = true;

      let imagelicenseU2 = new Image();
      //user2 image block
      imagelicenseU2.filename = "user2.jpg";
      imagelicenseU2.save({}).catch(function(err) {
        console.log(err);
      });
      licenseU2.image = imagelicenseU2;
      licenseU2.save().catch(e => {
        console.log(e);
      });
      user2.license = licenseU2;

      let addressU2 = new Address();
      //user2 address block
      addressU2.street1 = "1 Dickson place";
      addressU2.street2 = "";
      (addressU2.suburb = "Dickson"), (addressU2.state = "ACT");
      addressU2.postCode = "2602";
      addressU2.isDisabled = false;
      addressU2.save().catch(e => {
        console.log(e);
      });
      user2.address = addressU2;

      let creditCardU2 = new CreditCard();
      //user2 address block
      creditCardU2.cardNumber = " 3778 123456 12345";
      creditCardU2.nameOnCard = "user2";
      creditCardU2.expiryMonth = 12;
      creditCardU2.expiryYear = 2020;
      creditCardU2.save().catch(e => {
        console.log(e);
      });
      user2.creditCard = creditCardU2;

      let confirmationCodeU2 = new ConfirmationCode();
      confirmationCodeU2.code = "ABC123456789";
      confirmationCodeU2.codeType = "AccountUpdate";
      confirmationCodeU2.user = user2;
      confirmationCodeU2.expiresAt = "2018-05-01";
      confirmationCodeU2.save().catch(e => {
        console.log(e);
      });
      user2.confirmationCodes = confirmationCodeU2;

      user2.save({}).catch(function(err) {
        if (errorCode1 === err.code || errorCode2 === err.code) {
          console.log("Duplicate of user:", user2.email);
        }
      });
    }
  });

  // add locations if there are none already in the system
  let location1 = new Location();

  var nameLocation1 = "Sydney Airport";
  Location.findOne({ name: nameLocation1 })
    .populate("coordinates")
    .exec((error, location) => {
      if (!location) {
        let coordinate1 = new Coordinate();
        /* coordinate1 only used within location1 creation
              no need to be set if location is already found
              */
        console.log("Adding", nameLocation1, "...");
        coordinate1.latitude = "-33.947346";
        coordinate1.longitude = "151.179428";
        coordinate1.save().catch(e => {
          console.log(e);
        });
        location1.name = nameLocation1;
        location1.coordinates = coordinate1;
        location1.isDisabled = false;
        location1.save().catch(e => {
          console.log(e);
        });
      } else {
        console.log("Location '", nameLocation1, "' already exists.");
        location1 = location;
      }
    });

  let location2 = new Location();

  var nameLocation2 = "Melbourne Airport";
  Location.findOne({ name: nameLocation2 })
    .populate("coordinates")
    .exec((error, location) => {
      if (!location) {
        let coordinate2 = new Coordinate();
        /* coordinate2 only used within location2 creation
              no need to be set if location is already found
              */
        console.log("Adding", nameLocation2, "...");
        coordinate2.latitude = "-37.669012";
        coordinate2.longitude = "144.841027";
        coordinate2.save().catch(e => {
          console.log(e);
        });
        location2.name = nameLocation2;
        location2.coordinates = coordinate2;
        location2.isDisabled = false;
        location2.save().catch(e => {
          console.log(e);
        });
      } else {
        console.log("Location '", nameLocation2, "' already exists.");
        location2 = location;
      }
    });

  let location3 = new Location();

  var nameLocation3 = "Perth Airport";
  Location.findOne({ name: nameLocation3 })
    .populate("coordinates")
    .exec((error, location) => {
      if (!location) {
        let coordinate3 = new Coordinate();
        /* coordinate2 only used within location2 creation
      no need to be set if location is already found
      */
        console.log("Adding", nameLocation3, "...");
        coordinate3.latitude = "-31.953512";
        coordinate3.longitude = "115.857048";
        coordinate3.save().catch(e => {
          console.log(e);
        });
        location3.name = nameLocation3;
        location3.coordinates = coordinate3;
        location3.isDisabled = false;
        location3.save().catch(e => {
          console.log(e);
        });
      } else {
        console.log("Location '", nameLocation3, "' already exists.");
        location3 = location;
      }
    });

  let location4 = new Location();

  var nameLocation4 = "Sydney Shangri-La";
  Location.findOne({ name: nameLocation4 })
    .populate("coordinates")
    .exec((error, location) => {
      if (!location) {
        let coordinate4 = new Coordinate();
        console.log("Adding", nameLocation4, "...");
        coordinate4.latitude = "-33.8624313";
        coordinate4.longitude = "151.204416";
        coordinate4.save().catch(e => {
          console.log(e);
        });
        location4.name = nameLocation4;
        location4.coordinates = coordinate4;
        location4.isDisabled = false;
        location4.save().catch(e => {
          console.log(e);
        });
      } else {
        console.log("Location '", nameLocation4, "' already exists.");
        location4 = location;
      }
    });

  // add vehicle types if not already in the system
  let typeSmall = new VehicleType();
  var nameCarType1 = "small";
  VehicleType.findOne({ name: nameCarType1 }, (error, vehicleType) => {
    if (!vehicleType) {
      typeSmall.name = nameCarType1;
      typeSmall.hourlyRate = 7;
      typeSmall.save().catch(e => {
        console.log(e);
      });
    } else {
      console.log("vehicleType '", nameCarType1, "' already exists.");
      typeSmall = vehicleType;
    }
  });

  let typeSports = new VehicleType();
  var nameCarType2 = "sports";
  VehicleType.findOne({ name: nameCarType2 }, (error, vehicleType) => {
    if (!vehicleType) {
      typeSports.name = nameCarType2;
      typeSports.hourlyRate = 8.75;
      typeSports.save().catch(e => {
        console.log(e);
      });
    } else {
      console.log("vehicleType '", nameCarType2, "' already exists.");
      typeSports = vehicleType;
    }
  });

  let typeLuxury = new VehicleType();
  var nameCarType3 = "luxury";
  VehicleType.findOne({ name: nameCarType3 }, (error, vehicleType) => {
    if (!vehicleType) {
      typeLuxury.name = nameCarType3;
      typeLuxury.hourlyRate = 10.5;
      typeLuxury.save().catch(e => {
        console.log(e);
      });
    } else {
      console.log("vehicleType '", nameCarType3, "' already exists.");
      typeLuxury = vehicleType; //Links variable to existing type
    }
  });

  let typeSuv = new VehicleType();
  var nameCarType4 = "suv";
  VehicleType.findOne({ name: nameCarType4 }, (error, vehicleType) => {
    if (!vehicleType) {
      typeSuv.name = nameCarType4;
      typeSuv.hourlyRate = 10.5;
      typeSuv.save().catch(e => {
        console.log(e);
      });
    } else {
      console.log("vehicleType '", nameCarType4, "' already exists.");
      typeSuv = vehicleType;
    }
  });

  // add cars if there are none already in the system
  let car1 = null;
  var regoC1 = "ABC123";
  Car.findOne({ rego: regoC1 }, (error, car) => {
    if (!car) {
      car1 = new Car();
      (car1.rego = regoC1), (car1.make = "Hyundai");
      car1.model = "Getz";
      car1.colour = "white";
      car1.year = "2017";
      car1.seats = "5";
      car1.doors = "3";
      car1.vehicleType = typeSmall;
      car1.isDisabled = false;
      car1.location = location1;
      car1.movements = new Movement();
      car1.movements.car = car1;
      //Movement Block
      let movementsC1 = new Movement();
      movementsC1.car = car1;
      movementsC1.coordinates = location1.coordinates;
      movementsC1.save().catch(e => {
        console.log(e);
      });

      car1.movements = movementsC1;
      car1.save().catch(e => {
        console.log(e);
      });
    } else {
      console.log("Car '", regoC1, "' already exists.");
    }
  });

  let car2 = null;
  var regoC2 = "ABC456";
  Car.findOne({ rego: regoC2 }, (error, car) => {
    if (!car) {
      car2 = new Car();
      (car2.rego = regoC2), (car2.make = "Mazda");
      car2.model = "MX-5";
      car2.colour = "blue";
      car2.year = "2017";
      car2.seats = "5";
      car2.doors = "5";
      car2.vehicleType = typeSports;
      car2.location = location4;
      car2.isDisabled = false;

      //Movement Block
      let movementsC2 = new Movement();
      movementsC2.car = car2;
      movementsC2.coordinates = location4.coordinates;
      movementsC2.save().catch(e => {
        console.log(e);
      });

      car2.movements = movementsC2;
      car2.save().catch(e => {
        console.log(e);
      });
    } else {
      console.log("Car '", regoC2, "' already exists.");
    }
  });

  //Car 3 data Block
  let car3 = null;
  var regoC3 = "ABC789";
  Car.findOne({ rego: regoC3 }, (error, car) => {
    if (!car) {
      car3 = new Car();
      (car3.rego = regoC3), (car3.make = "Audi");
      car3.model = "A6";
      car3.colour = "red";
      car3.year = "2017";
      car3.seats = "5";
      car3.doors = "5";
      car3.vehicleType = typeLuxury;
      car3.location = location2;
      car3.isDisabled = false;

      //Movement Block
      let movementsC3 = new Movement();
      movementsC3.car = car3;
      movementsC3.coordinates = location2.coordinates;
      movementsC3.save().catch(e => {
        console.log(e);
      });

      car3.movements = movementsC3;
      car3.save().catch(e => {
        console.log(e);
      });
    } else {
      console.log("Car '", regoC3, "' already exists.");
    }
  });

  //Car 4 data Block
  var regoC4 = "DEF125";
  let car4 = null;
  Car.findOne({ rego: regoC4 }, (error, car) => {
    if (!car) {
      car4 = new Car();
      (car4.rego = regoC4), (car4.make = "Mazda");
      car4.model = "CX-9";
      car4.colour = "silver";
      car4.year = "2017";
      car4.seats = "5";
      car4.doors = "5";
      car4.vehicleType = typeSuv;
      car4.location = location3;
      car4.isDisabled = false;

      //Movement Block
      let movementsC4 = new Movement();
      movementsC4.car = car4;
      movementsC4.coordinates = location3.coordinates;
      movementsC4.save().catch(e => {
        console.log(e);
      });

      car4.movements = movementsC4;

      car4.save().catch(e => {
        console.log(e);
      });
    } else {
      console.log("Car '", regoC4, "' already exists.");
    }
  });

  let generateCar = async (index, make, model, colour, year, seats, doors, location, vehicleType) => {
    let cRego = `XYZ00${index}`;
    try {
      var existing = await Car.findOne({rego: cRego}).exec()
      if (!existing) {
        let car = new Car();
        car.rego = cRego;
        car.make = make;
        car.model = model;
        car.colour = colour;
        car.year = year;
        car.seats = seats;
        car.doors = doors;
        car.vehicleType = vehicleType;
        car.location = location;
        car.isDisabled = false;

        const saved = await car.save();
      } else {
        console.log(`Car ${cRego} already exists`);
      }
    } catch (e) {
      console.log(`Adding Car ${cRego} failed`, e)
    }
  };

  let carIndex = 0;
  while (carIndex < 5) {
    await generateCar(carIndex++, "BMW", "X5", "Blue", 2014, 4, 5, location3._id, typeSuv._id)
  }
  while (carIndex < 10) {
    await generateCar(carIndex++, "Lexus", "LS Sedan", "Titanium", 2018, 4, 5, location3._id, typeLuxury._id)
  }
  while (carIndex < 15) {
    await generateCar(carIndex++, "Hyundai", "i30", "Green", 2015, 4, 5, location3._id, typeSmall._id)
  }
  while (carIndex < 20) {
    await generateCar(carIndex++, "BMW", "3 Series", "Gold", 2015, 2, 3, location3._id, typeSports._id)
  }


  // Dummy Booking data
  Car.find().exec((carErr, anyCar) => {
    if (carErr) {
      console.log(carErr);
    } else if (!anyCar) {
      Booking.find({ car: car1._id }).exec((error, bookingType) => {
        if (!bookingType) {
          let booking1C1 = new Booking();
          let booking2C1 = new Booking();
          booking1C1.car = car1;
          booking1C1.user = user1;
          booking1C1.unlockCode = "123456";
          booking1C1.startsAt = "2018-02-10T09:50:42.389Z";
          booking1C1.endsAt = "2018-02-10T10:50:42.389Z";
          booking1C1.isDisabled = false;
          booking1C1.save().catch(e => {
            console.log(e);
          });
          booking2C1.car = car1;
          booking2C1.user = user1;
          booking2C1.unlockCode = "QWERTY";
          booking2C1.startsAt = "2018-02-20T09:50:42.389Z";
          booking2C1.endsAt = "2018-02-21T10:50:42.389Z";
          booking2C1.isDisabled = false;
          booking2C1.save().catch(e => {
            console.log(e);
          });
        } else {
          console.log("Bookings for car 1 already exists.");
        }
      });
      Booking.find({ car: car2._id }).exec((error, bookingType) => {
        if (!bookingType) {
          let booking1C2 = new Booking();
          let booking2C2 = new Booking();
          booking1C2.car = car2;
          booking1C2.user = user1;
          booking1C2.unlockCode = "123456";
          booking1C2.startsAt = "2018-02-10T09:50:42.389Z";
          booking1C2.endsAt = "2018-02-10T10:50:42.389Z";
          booking1C2.isDisabled = false;
          booking1C2.save().catch(e => {
            console.log(e);
          });
          booking2C2.car = car2;
          booking2C2.user = user1;
          booking2C2.unlockCode = "QWERTY";
          booking2C2.startsAt = "2018-02-20T09:50:42.389Z";
          booking2C2.endsAt = "2018-02-21T10:50:42.389Z";
          booking2C2.isDisabled = false;
          booking2C2.save().catch(e => {
            console.log(e);
          });
        } else {
          console.log("Bookings for car 2 already exists.");
        }
      });
      Booking.find({ car: car3._id }).exec((error, bookingType) => {
        if (!bookingType) {
          let booking1C3 = new Booking();
          let booking2C3 = new Booking();
          booking1C3.car = car3;
          booking1C3.user = user1;
          booking1C3.unlockCode = "123456";
          booking1C3.startsAt = "2018-02-10T09:50:42.389Z";
          booking1C3.endsAt = "2018-02-10T10:50:42.389Z";
          booking1C3.isDisabled = false;
          booking1C3.save().catch(e => {
            console.log(e);
          });
          booking2C3.car = car3;
          booking2C3.user = user1;
          booking2C3.unlockCode = "QWERTY";
          booking2C3.startsAt = "2018-02-20T09:50:42.389Z";
          booking2C3.endsAt = "2018-02-21T10:50:42.389Z";
          booking2C3.isDisabled = false;
          booking2C3.save().catch(e => {
            console.log(e);
          });
        } else {
          console.log("Bookings for car 3 already exists.");
        }
      });
      Booking.find({ car: car4._id }).exec((error, bookingType) => {
        if (!bookingType) {
          let booking1C4 = new Booking();
          let booking2C4 = new Booking();
          booking1C4.car = car4;
          booking1C4.user = user1;
          booking1C4.unlockCode = "123456";
          booking1C4.startsAt = "2018-02-10T09:50:42.389Z";
          booking1C4.endsAt = "2018-02-10T10:50:42.389Z";
          booking1C4.isDisabled = false;
          booking1C4.save().catch(e => {
            console.log(e);
          });
          booking2C4.car = car4;
          booking2C4.user = user1;
          booking2C4.unlockCode = "QWERTY";
          booking2C4.startsAt = "2018-02-20T09:50:42.389Z";
          booking2C4.endsAt = "2018-02-21T10:50:42.389Z";
          booking2C4.isDisabled = false;
          booking2C4.save().catch(e => {
            console.log(e);
          });
        } else {
          console.log("Bookings for car 4 already exists.");
        }
      });
    } else {
      User.findOne({ isAdmin: true }).exec((usrErr, users) => {
        if (usrErr) {
          console.log(usrErr);
        } else {
          Car.find().exec((carErr, cars) => {
            if (carErr) {
              console.log(carErr);
            } else {
              cars.forEach(c => {
                Booking.findOne({ car: c._id }).exec((error, b) => {
                  // Check for existing Bookings to avoid flooding the db
                  if (!b) {
                    let booking1 = new Booking();
                    let booking2 = new Booking();
                    booking1.car = c._id;
                    booking1.user = users._id;
                    booking1.unlockCode = "123456";
                    booking1.startsAt = "2018-02-10T09:50:42.389Z";
                    booking1.endsAt = "2018-02-10T10:50:42.389Z";
                    booking1.isDisabled = false;
                    booking1.save().catch(e => {
                      console.log(e);
                    });
                    booking2.car = c._id;
                    booking2.user = users._id;
                    booking2.unlockCode = "QWERTY";
                    booking2.startsAt = "2018-02-20T09:50:42.389Z";
                    booking2.endsAt = "2018-02-21T10:50:42.389Z";
                    booking2.isDisabled = false;
                    booking2.save().catch(e => {
                      console.log(e);
                    });
                  }
                });
              });
            }
          });
        }
      });
    }
  });

  //Dummy Offer data
  let offerCodeOne = "10Percent";
  Offer.findOne({ offerCode: offerCodeOne }, (error, offer) => {
    if (!offer) {
      let offerOne = new Offer();
      offerOne.offerCode = offerCodeOne;
      // Multiplier for % off
      offerOne.multiplier = 10;
      // oneOffValue for $ off
      //oneOffValue
      offerOne.isDisabled = false;
      offerOne.expiresAt = moment().add(3, "d");
      offerOne.save().catch(e => {
        console.log(e);
      });
    }
  });

  let offerCodeTwo = "June5$";
  Offer.findOne({ offerCode: offerCodeTwo }, (error, offer) => {
    if (!offer) {
      let offerTwo = new Offer();
      offerTwo.offerCode = offerCodeTwo;
      // Multiplier for % off
      //offerTwo.multiplier = 10;
      // oneOffValue for $ off
      offerTwo.oneOffValue = 5;
      offerTwo.isDisabled = false;
      offerTwo.expiresAt = moment().add(3, "d");
      offerTwo.save().catch(e => {
        console.log(e);
      });
    }
  });

  let offerCodeThree = "Expired";
  Offer.findOne({ offerCode: offerCodeThree }, (error, offer) => {
    if (!offer) {
      let offerThree = new Offer();
      offerThree.offerCode = offerCodeThree;
      // Multiplier for % off
      //offerThree.multiplier = 10;
      // oneOffValue for $ off
      offerThree.oneOffValue = 5;
      offerThree.isDisabled = false;
      offerThree.expiresAt = moment().subtract(1, "d");
      offerThree.save().catch(e => {
        console.log(e);
      });
    }
  });

  let offerCodeFour = "Disabled";
  Offer.findOne({ offerCode: offerCodeFour }, (error, offer) => {
    if (!offer) {
      let offerFour = new Offer();
      offerFour.offerCode = offerCodeFour;
      // Multiplier for % off
      //offerFour.multiplier = 10;
      // oneOffValue for $ off
      offerFour.oneOffValue = 5;
      offerFour.isDisabled = true;
      offerFour.expiresAt = moment().add(200, "d");
      offerFour.save().catch(e => {
        console.log(e);
      });
    }
  });

  const generateEnquiry = (from, name, msg, recvdAt, resp, respAt) => {
    const enq = new  Enquiry();
    enq.emailFrom = from;
    enq.name = name;
    enq.message = msg;
    enq.receivedAt = recvdAt;
    enq.response = resp;
    enq.responseAt = respAt;

    return enq;
  };

  try {
    const existing = await Enquiry.find({}).exec();
    if (existing.length < 6) {
      const now = new Date();
      const e1 = generateEnquiry('testuser1@mailinator.com', 'tester1', 'where\'s my car dude?', 
        DateUtils.addHours(now, -12), 'Dunno dude. Where\'s your car?', DateUtils.addHours(now, -11.75));
      const e2 = generateEnquiry('testuser2@mailinator.com', 'tester2', 'i cant find the keys', DateUtils.addHours(now, -5), null, null);
      const e3 = generateEnquiry('testuser2@mailinator.com', 'tester2', 'i dont have a license, can i still use shacar', DateUtils.addHours(now, -4), null, null);
      const e4 = generateEnquiry('testuser2@mailinator.com', 'tester2', 'i dont have a license, can i still use shacar', DateUtils.addHours(now, -28), null, null);
      const e5 = generateEnquiry('testuser2@mailinator.com', 'tester2', 'i dont have a license, can i still use shacar', DateUtils.addHours(now, -52), null, null);
      const e6 = generateEnquiry('testuser2@mailinator.com', 'tester2', 'i dont have a license, can i still use shacar', DateUtils.addHours(now, -124), null, null);
  
      await e1.save();
      await e2.save();
      await e3.save();
      await e4.save();
      await e5.save();
      await e6.save();
    }
  } catch(e) {
    console.log(e);
  }

  try {
    const users = await User.find({}).exec();
    const locations = await Location.find({}).exec();
    const coords = await Coordinate.find({}).exec();
    const vType = await VehicleType.find({}).exec();
    const cars = await Car.find({}).exec();
    const bookings = await Booking.find({}).exec();
    const offers = await Offer.find({}).exec();
    const enqs = await Enquiry.find({}).exec();

    console.log("____ Seeded data wrap-up ____");
    console.log("Model         Count");
    console.log('```````````````````')
    console.log("Users         " + users.length);
    console.log("Locations     " + locations.length);
    console.log("Coordinates   " + coords.length);
    console.log("VehicleType   " + vType.length);
    console.log("Cars          " + cars.length);
    console.log("Bookings      " + bookings.length);
    console.log("Offers        " + offers.length);
    console.log("Enquiry       " + enqs.length);

  } catch(e) {
    console.log('dummyData wrap-up failed', e);
  }  
};
