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
    .populate("name")
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
    .populate("name")
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
    .populate("name")
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
    .populate("name")
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

  //Car 5 data Block
  var regoC5 = "XYZ005";
  let car5 = null;
  Car.findOne({ rego: regoC5 })
  .populate({
    path: 'location',
    
    populate: {path: 'name'},
  })
  .exec((error, car) => {
    if (!car) {
      car5 = new Car();
      car5.rego = regoC5;
      car5.make = "BMW";
      car5.model = "X5";
      car5.colour = "Blue";
      car5.year = "2014";
      car5.seats = "4";
      car5.doors = "5";
      car5.vehicleType = typeSuv;
      car5.location = location3;
      car5.isDisabled = false;

      //Movement Block
      let movementsC5 = new Movement();
      movementsC5.car = car5;
      movementsC5.coordinates = location3.coordinates;
      movementsC5.save().catch(e => {
        console.log(e);
      });

      car5.movements = movementsC5;

      car5.save().catch(e => {
        console.log(e);
      });
    } else {
      if(car.location.name===null)
      {
        car.location=location3;
        car.save().catch(e => {
          console.log(e);
        });
      }
      console.log("Car '", regoC5, "' already exists.");
    }
  });

//Car 6 data Block
  var regoC6 = "XYZ006";
  let car6 = null;
  Car.findOne({ rego: regoC6 })
  .populate({
    path: 'location',
    
    populate: {path: 'name'},
  })
  .exec((error, car) => {
    if (!car) {
      car6 = new Car();
      car6.rego = regoC6;
      car6.make = "BMW";
      car6.model = "X5";
      car6.colour = "Red";
      car6.year = "2013";
      car6.seats = "4";
      car6.doors = "5";
      car6.vehicleType = typeSuv;
      car6.location = location3;
      car6.isDisabled = false;

      //Movement Block
      let movementsC6 = new Movement();
      movementsC6.car = car6;
      movementsC6.coordinates = location3.coordinates;
      movementsC6.save().catch(e => {
        console.log(e);
      });

      car6.movements = movementsC6;

      car6.save().catch(e => {
        console.log(e);
      });
    } else {
      if(car.location.name===null)
      {
        car.location=location3;
        car.save().catch(e => {
          console.log(e);
        });
      }
      console.log("Car '", regoC6, "' already exists.");
    }
  });

//Car 7 data Block
  var regoC7 = "XYZ007";
  let car7 = null;
  Car.findOne({ rego: regoC7 })
  .populate({
    path: 'location',
    
    populate: {path: 'name'},
  })
  .exec((error, car) => {
    if (!car) {
      car7 = new Car();
      car7.rego = regoC7;
      car7.make = "BMW";
      car7.model = "X6";
      car7.colour = "Gold";
      car7.year = "2015";
      car7.seats = "2";
      car7.doors = "3";
      car7.vehicleType = typeSuv;
      car7.location = location3;
      car7.isDisabled = false;

      //Movement Block
      let movementsC7 = new Movement();
      movementsC7.car = car7;
      movementsC7.coordinates = location3.coordinates;
      movementsC7.save().catch(e => {
        console.log(e);
      });

      car7.movements = movementsC7;

      car7.save().catch(e => {
        console.log(e);
      });
    } else {
      if(car.location.name===null)
      {
        car.location=location3;
        car.save().catch(e => {
          console.log(e);
        });
      }
      console.log("Car '", regoC7, "' already exists.");
    }
  });

//Car 8 data Block
  var regoC8 = "XYZ008";
  let car8 = null;
  Car.findOne({ rego: regoC8 })
  .populate({
    path: 'location',
    
    populate: {path: 'name'},
  })
  .exec((error, car) => {
    if (!car) {
      car8 = new Car();
      car8.rego = regoC8;
      car8.make = "Range Rover";
      car8.model = "Discovery";
      car8.colour = "Black";
      car8.year = "2014";
      car8.seats = "4";
      car8.doors = "5";
      car8.vehicleType = typeSuv;
      car8.location = location3;
      car8.isDisabled = false;

      //Movement Block
      let movementsC8 = new Movement();
      movementsC8.car = car8;
      movementsC8.coordinates = location3.coordinates;
      movementsC8.save().catch(e => {
        console.log(e);
      });

      car8.movements = movementsC8;

      car8.save().catch(e => {
        console.log(e);
      });
    } else {
      if(car.location.name===null)
      {
        car.location=location3;
        car.save().catch(e => {
          console.log(e);
        });
      }
      console.log("Car '", regoC8, "' already exists.");
    }
  });

//Car 9 data Block
  var regoC9 = "XYZ009";
  let car9 = null;
  Car.findOne({ rego: regoC9 })
  .populate({
    path: 'location',
    
    populate: {path: 'name'},
  })
  .exec((error, car) => {
    if (!car) {
      car9 = new Car();
      car9.rego = regoC9;
      car9.make = "BMW";
      car9.model = "3 Series";
      car9.colour = "Red";
      car9.year = "2013";
      car9.seats = "4";
      car9.doors = "5";
      car9.vehicleType = typeLuxury;
      car9.location = location3;
      car9.isDisabled = false;

      //Movement Block
      let movementsC9 = new Movement();
      movementsC9.car = car9;
      movementsC9.coordinates = location3.coordinates;
      movementsC9.save().catch(e => {
        console.log(e);
      });

      car9.movements = movementsC9;

      car9.save().catch(e => {
        console.log(e);
      });
    } else {
      if(car.location.name===null)
      {
        car.location=location3;
        car.save().catch(e => {
          console.log(e);
        });
      }
      console.log("Car '", regoC9, "' already exists.");
    }
  });

//Car 10 data Block
  var regoC10 = "XYZ010";
  let car10 = null;
  Car.findOne({ rego: regoC10 })
  .populate({
    path: 'location',
    
    populate: {path: 'name'},
  })
  .exec((error, car) => {
    if (!car) {
      car10 = new Car();
      car10.rego = regoC10;
      car10.make = "BMW";
      car10.model = "3 Series";
      car10.colour = "Gold";
      car10.year = "2015";
      car10.seats = "2";
      car10.doors = "3";
      car10.vehicleType = typeLuxury;
      car10.location = location3;
      car10.isDisabled = false;

      //Movement Block
      let movementsC10 = new Movement();
      movementsC10.car = car10;
      movementsC10.coordinates = location3.coordinates;
      movementsC10.save().catch(e => {
        console.log(e);
      });

      car10.movements = movementsC10;

      car10.save().catch(e => {
        console.log(e);
      });
    } else {
      if(car.location.name===null)
      {
        car.location=location3;
        car.save().catch(e => {
          console.log(e);
        });
      }
      console.log("Car '", regoC10, "' already exists.");
    }
  });

//Car 11 data Block
  var regoC11 = "XYZ011";
  let car11 = null;
  Car.findOne({ rego: regoC11 })
  .populate({
    path: 'location',
    
    populate: {path: 'name'},
  })
  .exec((error, car) => {
    if (!car) {
      car11 = new Car();
      car11.rego = regoC11;
      car11.make = "BMW";
      car11.model = "3 Series";
      car11.colour = "Gold";
      car11.year = "2000";
      car11.seats = "2";
      car11.doors = "3";
      car11.vehicleType = typeLuxury;
      car11.location = location3;
      car11.isDisabled = false;

      //Movement Block
      let movementsC11 = new Movement();
      movementsC11.car = car11;
      movementsC11.coordinates = location3.coordinates;
      movementsC11.save().catch(e => {
        console.log(e);
      });

      car11.movements = movementsC11;

      car11.save().catch(e => {
        console.log(e);
      });
    } else {
      if(car.location.name===null)
      {
        car.location=location3;
        car.save().catch(e => {
          console.log(e);
        });
      }
      console.log("Car '", regoC11, "' already exists.");
    }
  });

//Car 12 data Block
  var regoC12 = "XYZ012";
  let car12 = null;
  Car.findOne({ rego: regoC12 })
  .populate({
    path: 'location',
    
    populate: {path: 'name'},
  })
  .exec((error, car) => {
    if (!car) {
      car12 = new Car();
      car12.rego = regoC12;
      car12.make = "BMW";
      car12.model = "7 Series";
      car12.colour = "Gold";
      car12.year = "2008";
      car12.seats = "2";
      car12.doors = "3";
      car12.vehicleType = typeLuxury;
      car12.location = location3;
      car12.isDisabled = false;

      //Movement Block
      let movementsC12 = new Movement();
      movementsC12.car = car12;
      movementsC12.coordinates = location3.coordinates;
      movementsC12.save().catch(e => {
        console.log(e);
      });

      car12.movements = movementsC12;

      car12.save().catch(e => {
        console.log(e);
      });
    } else {
      if(car.location.name===null)
      {
        car.location=location3;
        car.save().catch(e => {
          console.log(e);
        });
      }
      console.log("Car '", regoC12, "' already exists.");
    }
  });

//Car 13 data Block
  var regoC13 = "XYZ013";
  let car13 = null;
  Car.findOne({ rego: regoC13 })
  .populate({
    path: 'location',
    
    populate: {path: 'name'},
  })
  .exec((error, car) => {
    if (!car) {
      car13 = new Car();
      car13.rego = regoC13;
      car13.make = "Toyota";
      car13.model = "Camry";
      car13.colour = "White";
      car13.year = "1994";
      car13.seats = "2";
      car13.doors = "3";
      car13.vehicleType = typeSmall;
      car13.location = location3;
      car13.isDisabled = false;

      //Movement Block
      let movementsC13 = new Movement();
      movementsC13.car = car13;
      movementsC13.coordinates = location3.coordinates;
      movementsC13.save().catch(e => {
        console.log(e);
      });

      car13.movements = movementsC13;

      car13.save().catch(e => {
        console.log(e);
      });
    } else {
      if(car.location.name===null)
      {
        car.location=location3;
        car.save().catch(e => {
          console.log(e);
        });
      }
      console.log("Car '", regoC13, "' already exists.");
    }
  });

//Car 14 data Block
  var regoC14 = "XYZ014";
  let car14 = null;
  Car.findOne({ rego: regoC14 })
  .populate({
    path: 'location',
    
    populate: {path: 'name'},
  })
  .exec((error, car) => {
    if (!car) {
      car14 = new Car();
      car14.rego = regoC14;
      car14.make = "Toyota";
      car14.model = "Camry Coupe";
      car14.colour = "White";
      car14.year = "2001";
      car14.seats = "2";
      car14.doors = "3";
      car14.vehicleType = typeSmall;
      car14.location = location3;
      car14.isDisabled = false;

      //Movement Block
      let movementsC14 = new Movement();
      movementsC14.car = car14;
      movementsC14.coordinates = location3.coordinates;
      movementsC14.save().catch(e => {
        console.log(e);
      });

      car14.movements = movementsC14;

      car14.save().catch(e => {
        console.log(e);
      });
    } else {
      if(car.location.name===null)
      {
        car.location=location3;
        car.save().catch(e => {
          console.log(e);
        });
      }
      console.log("Car '", regoC14, "' already exists.");
    }
  });

//Car 15 data Block
  var regoC15 = "XYZ015";
  let car15 = null;
  Car.findOne({ rego: regoC15 })
  .populate({
    path: 'location',
    
    populate: {path: 'name'},
  })
  .exec((error, car) => {
    if (!car) {
      car15 = new Car();
      car15.rego = regoC15;
      car15.make = "Hyundai";
      car15.model = "i30";
      car15.colour = "Gold";
      car15.year = "2015";
      car15.seats = "4";
      car15.doors = "5";
      car15.vehicleType = typeSmall;
      car15.location = location3;
      car15.isDisabled = false;

      //Movement Block
      let movementsC15 = new Movement();
      movementsC15.car = car15;
      movementsC15.coordinates = location3.coordinates;
      movementsC15.save().catch(e => {
        console.log(e);
      });

      car15.movements = movementsC15;

      car15.save().catch(e => {
        console.log(e);
      });
    } else {
      if(car.location.name===null)
      {
        car.location=location3;
        car.save().catch(e => {
          console.log(e);
        });
      }
      console.log("Car '", regoC15, "' already exists.");
    }
  });

//Car 16 data Block
  var regoC16 = "XYZ016";
  let car16 = null;
  Car.findOne({ rego: regoC16 })
  .populate({
    path: 'location',
    
    populate: {path: 'name'},
  })
  .exec((error, car) => {
    if (!car) {
      car16 = new Car();
      car16.rego = regoC16;
      car16.make = "Hyundai";
      car16.model = "i20";
      car16.colour = "Gold";
      car16.year = "2015";
      car16.seats = "4";
      car16.doors = "5";
      car16.vehicleType = typeSmall;
      car16.location = location3;
      car16.isDisabled = false;

      //Movement Block
      let movementsC16 = new Movement();
      movementsC16.car = car16;
      movementsC16.coordinates = location3.coordinates;
      movementsC16.save().catch(e => {
        console.log(e);
      });

      car16.movements = movementsC16;

      car16.save().catch(e => {
        console.log(e);
      });
    } else {
      if(car.location.name===null)
      {
        car.location=location3;
        car.save().catch(e => {
          console.log(e);
        });
      }
      console.log("Car '", regoC16, "' already exists.");
    }
  });

//Car 17 data Block
  var regoC17 = "XYZ017";
  let car17 = null;
  Car.findOne({ rego: regoC17 })
  .populate({
    path: 'location',
    
    populate: {path: 'name'},
  })
  .exec((error, car) => {
    if (!car) {
      car17 = new Car();
      car17.rego = regoC17;
      car17.make = "BMW";
      car17.model = "M3 Series";
      car17.colour = "Gold";
      car17.year = "2011";
      car17.seats = "2";
      car17.doors = "3";
      car17.vehicleType = typeSports;
      car17.location = location3;
      car17.isDisabled = false;

      //Movement Block
      let movementsC17 = new Movement();
      movementsC17.car = car17;
      movementsC17.coordinates = location3.coordinates;
      movementsC17.save().catch(e => {
        console.log(e);
      });

      car17.movements = movementsC17;

      car17.save().catch(e => {
        console.log(e);
      });
    } else {
      if(car.location.name===null)
      {
        car.location=location3;
        car.save().catch(e => {
          console.log(e);
        });
      }
      console.log("Car '", regoC17, "' already exists.");
    }
  });

//Car 18 data Block
  var regoC18 = "XYZ018";
  let car18 = null;
  Car.findOne({ rego: regoC18 })
  .populate({
    path: 'location',
    
    populate: {path: 'name'},
  })
  .exec((error, car) => {
    if (!car) {
      car18 = new Car();
      car18.rego = regoC18;
      car18.make = "BMW";
      car18.model = "M1 Series";
      car18.colour = "Black";
      car18.year = "2012";
      car18.seats = "2";
      car18.doors = "3";
      car18.vehicleType = typeSports;
      car18.location = location3;
      car18.isDisabled = false;

      //Movement Block
      let movementsC18 = new Movement();
      movementsC18.car = car18;
      movementsC18.coordinates = location3.coordinates;
      movementsC18.save().catch(e => {
        console.log(e);
      });

      car18.movements = movementsC18;

      car18.save().catch(e => {
        console.log(e);
      });
    } else {
      if(car.location.name===null)
      {
        car.location=location3;
        car.save().catch(e => {
          console.log(e);
        });
      }
      console.log("Car '", regoC18, "' already exists.");
    }
  });

//Car 19 data Block
  var regoC19 = "XYZ019";
  let car19 = null;
  Car.findOne({ rego: regoC19 })
  .populate({
    path: 'location',
    
    populate: {path: 'name'},
  })
  .exec((error, car) => {
    if (!car) {
      car19 = new Car();
      car19.rego = regoC19;
      car19.make = "BMW";
      car19.model = "Z4 Series";
      car19.colour = "Silver";
      car19.year = "2013";
      car19.seats = "2";
      car19.doors = "3";
      car19.vehicleType = typeSports;
      car19.location = location3;
      car19.isDisabled = false;

      //Movement Block
      let movementsC19 = new Movement();
      movementsC19.car = car19;

      movementsC19.coordinates = location3.coordinates;
      movementsC19.save().catch(e => {
        console.log(e);
      });

      car19.movements = movementsC19;

      car19.save().catch(e => {
        console.log(e);
      });
    } else {
      if(car.location.name===null)
      {
        car.location=location3;
        car.save().catch(e => {
          console.log(e);
        });
      }
      console.log("Car '", regoC19, "' already exists.");
    }
  });

//Car 20 data Block
  var regoC20 = "XYZ020";
  let car20 = null;
  Car.findOne({ rego: regoC20 })
  .populate({
    path: 'location',
    
    populate: {path: 'name'},
  })
  .exec((error, car) => {
    if (!car) {
      car20 = new Car();
      car20.rego = regoC20;
      car20.make = "BMW";
      car20.model = "Z4 Series";
      car20.colour = "Green";
      car20.year = "2017";
      car20.seats = "2";
      car20.doors = "3";
      car20.vehicleType = typeSports;
      car20.location = location3;
      car20.isDisabled = false;

      //Movement Block
      let movementsC20 = new Movement();
      movementsC20.car = car20;
      movementsC20.coordinates = location3.coordinates;
      movementsC20.save().catch(e => {
        console.log(e);
      });

      car20.movements = movementsC20;

      car20.save().catch(e => {
        console.log(e);
      });
    } else {
      if(car.location.name===null)
      {
        car.location=location3;
        car.save().catch(e => {
          console.log(e);
        });
      }
      console.log("Car '", regoC20, "' already exists.");
    }
  });

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
