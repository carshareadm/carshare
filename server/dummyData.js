/* Import dbScheme */
import Address from "./models/address";
import Booking from "./models/booking";
import Car from "./models/car";
import ConfirmationCode from "./models/confirmationCode";
import Coordinate from "./models/coordinate";
import CreditCard from "./models/creditCard";
import DamageReport from "./models/damageReport";
import Enquiry from "./models/enquiry";
import Image from "./models/image";
import License from "./models/license";
import Location from "./models/location";
import Movement from "./models/movement";
import User from "./models/user";
import VehicleType from "./models/vehicleType";

module.exports = function() {
  // add dummy data here
  // see http://mongoosejs.com/docs/queries.html for an intro on how to query mongoDb using mongoose
  // see http://mongoosejs.com/docs/models.html for intro on how to add/save data

  // add an admin user if there is not one already in the system... preferably using carshareadm@gmail.com
  console.log("DB: Start loading seed data");

  User.count({}, (err, count) => {
    if (count < 1) {
      console.log('Adding users...');

      let userOne = new User();
      userOne.email = "carshareadm@gmail.com";
      userOne.mobile = "0412345678";
      userOne.password = "shacar";
      userOne.isAdmin = true;
      userOne.save({}).catch(function(err) {
        if (11000 === err.code || 11001 === err.code) {
          console.log("DB Error: Duplicate of user:", userOne.email);
        }
      });
    
      //TestUsers
    
      let userTwo = new User();
      userTwo.email = "user1@test.com";
      userTwo.mobile = "0411111111";
      userTwo.password = "user1";
    
      //UserTwo license block
      let licenseU1 = new License();
      licenseU1.licenseNumber = "ABC123456";
    
      let imagelicenseU1 = new Image();
      //userTwo image block
      imagelicenseU1.fileHandle = "userTwo";
      imagelicenseU1.extension = "jpg";
      imagelicenseU1.save({}).catch(function(err) {
        if (11000 === err.code || 11001 === err.code) {
          console.log("DB Error: Duplicate of license:", imagelicenseU1.fileHandle);
        }
      });
      licenseU1.image = imagelicenseU1;
      licenseU1.save({}).catch();
      userTwo.license = licenseU1;
    
      let addressU1 = new Address();
      //userTwo address block
      addressU1.street1 = "1 Dickson place";
      addressU1.street2 = "";
      (addressU1.suburb = "Dickson"), (addressU1.state = "ACT");
      addressU1.postCode = "2602";
      addressU1.save({}).catch();
      userTwo.address = addressU1;
    
      let creditCardU1 = new CreditCard();
      //userTwo address block
      creditCardU1.cardNumber = " 3778 123456 12345";
      creditCardU1.nameOnCard = "userTwo";
      creditCardU1.ccv = "3547";
      creditCardU1.expiryMonth = 12;
      creditCardU1.expiryYear = 2020;
      creditCardU1.save({}).catch();
      userTwo.creditCard = creditCardU1;
    
      let confirmationCodeU1 = new ConfirmationCode();
      confirmationCodeU1.code = "ABC123456789";
      confirmationCodeU1.user = userTwo;
      confirmationCodeU1.expiresAt = "2018-05-01";
      confirmationCodeU1.save({}).catch();
      userTwo.confirmationCodes = confirmationCodeU1;
    
      userTwo.save({}).catch(function(err) {
        if (11000 === err.code || 11001 === err.code) {
          console.log("DB Error: Duplicate of user:", userTwo.email);
        }
      });
    }
  });
  
  // add locations if there are none already in the system
  let locationOne = new Location();
  let coordinateOne = new Coordinate();
  Location.findOne({'name': "Sydney Airport"})
          .populate('coordinates')
          .exec((error, location) => {
            if (!location) {
              console.log('Adding Sydney Airport...');
              coordinateOne.latitude = "-33.947346";
              coordinateOne.longitude = "151.179428";
              coordinateOne.save({}).catch();
              locationOne.name = "Sydney Airport";
              locationOne.coordinates = coordinateOne;
              locationOne.save({}).catch();
            }
            else {
              console.log('Sydney Airport already exists');
              locationOne = location;
            }
          });
  
  let locationTwo = new Location();
  let coordinateTwo = new Coordinate();
  Location.findOne({'name': "Melbourne Airport"})
          .populate('coordinates')
          .exec((error, location) => {
            if (!location) {
              console.log('Adding Melbourne Airport...');
              coordinateTwo.latitude = "-37.669012";
              coordinateTwo.longitude = "144.841027";
              coordinateTwo.save({}).catch();
              locationTwo.name = "Melbourne Airport";
              locationTwo.coordinates = coordinateTwo;
              locationTwo.save({}).catch();
            }
            else {
              console.log('Melbourne Airport already exists');
              locationTwo = location;
            }
          });

  let locationThree = new Location();
  let coordinateThree = new Coordinate();
  Location.findOne({'name': "Melbourne Airport"})
  .populate('coordinates')
  .exec((error, location) => {
    if (!location) {
      console.log('Adding Perth Airport...');
      coordinateThree.latitude = "-31.953512";
      coordinateThree.longitude = "115.857048";
      coordinateThree.save({}).catch();
      locationThree.name = "Perth Airport";
      locationThree.coordinates = coordinateThree;
      locationThree.save({}).catch();
    }
    else {
      console.log('Perth Airport already exists');
      locationThree = location;
    }
  }); 

  // add vehicle types if not already in the system
  let typeSmall = new VehicleType();
  VehicleType.findOne({'name': 'small'}, (error, vehicleType) => {
    if(!vehicleType) {
      typeSmall.name = "small";
      typeSmall.hourlyRate = 7;
      typeSmall.save({}).catch(function(err) {
        if (11000 === err.code || 11001 === err.code) {
          console.log("DB Error: Duplicate of type:", typeSmall.name);
        }
      });   
    }
    else {
      console.log('small vehicleType already exists')
      typeSmall = vehicleType;
    }
  });


  let typeSports = new VehicleType();
  VehicleType.findOne({'name': 'sports'}, (error, vehicleType) => {
    if(!vehicleType) {
      typeSports.name = "sports";
      typeSports.hourlyRate = 8.75;
      typeSports.save({}).catch(function(err) {
        if (11000 === err.code || 11001 === err.code) {
          console.log("DB Error: Duplicate of type:", typeSports.name);
        }
      });      
    }
    else {
      console.log('sports vehicleType already exists')
      typeSports = vehicleType;
    }
  });

  let typeLuxury = new VehicleType();
  VehicleType.findOne({'name': 'luxury'}, (error, vehicleType) => {
    if(!vehicleType) {
      typeLuxury.name = "luxury";
      typeLuxury.hourlyRate = 10.5;
      typeLuxury.save({}).catch(function(err) {
        if (11000 === err.code || 11001 === err.code) {
          console.log("DB Error: Duplicate of type:", typeLuxury.name);
        }
      });
    }
    else {
      console.log('luxury vehicleType already exists')
      typeLuxury = vehicleType;
    }
  });


  let typeSuv = new VehicleType();
  VehicleType.findOne({'name': 'suv'}, (error, vehicleType) => {
    if(!vehicleType) {
      typeSuv.name = "suv";
      typeSuv.hourlyRate = 10.5;
      typeSuv.save({}).catch(function(err) {
        if (11000 === err.code || 11001 === err.code) {
          console.log("DB Error: Duplicate of type:", typeSuv.name);
        }
      });
    }
    else {
      console.log('suv vehicleType already exists')
      typeSuv = vehicleType;
    }
  });


  // add cars if there are none already in the system
  Car.findOne({'rego': 'ABC123'}, (error, car) => {
    if(!car) {
      let carOne = new Car();
      (carOne.rego = "ABC123"), (carOne.make = "Hyundai");
      carOne.model = "Getz";
      carOne.colour = "white";
      carOne.year = "2017";
      carOne.seats = "5";
      carOne.doors = "3";
      carOne.vehicleType = typeSmall;
      carOne.location = locationOne;
      carOne.movements = new Movement();
      carOne.movements.car = carOne;
      //Movement Block
      let movementsC1 = new Movement();
      movementsC1.car = carOne;
      movementsC1.coordinates = locationOne.coordinates;
      movementsC1.save({}).catch();
    
      carOne.movements = movementsC1;
      carOne.save({}).catch(function(err) {
        if (11000 === err.code || 11001 === err.code) {
          console.log("DB Error: Duplicate of car:", carOne.rego);
        }
      });
    }
  });

  Car.findOne({'rego': 'ABC456'}, (error, car) => {
    if(!car) {
      let carTwo = new Car();
      (carTwo.rego = "ABC456"), (carTwo.make = "Mazda");
      carTwo.model = "MX-5";
      carTwo.colour = "blue";
      carTwo.year = "2017";
      carTwo.seats = "5";
      carTwo.doors = "5";
      carTwo.vehicleType = typeSports;
      carTwo.location = locationOne;
    
      //Movement Block
      let movementsC2 = new Movement();
      movementsC2.car = carTwo;
      movementsC2.coordinates = locationOne.coordinates;
      movementsC2.save({}).catch();
    
      carTwo.movements = movementsC2;
      carTwo.save({}).catch(function(err) {
        if (11000 === err.code || 11001 === err.code) {
          console.log("DB Error: Duplicate of car:", carTwo.rego);
        }
      });
    }
  });

  Car.findOne({'rego': 'ABC789'}, (error, car) => {
    if(!car) {
      let carThree = new Car();
      (carThree.rego = "ABC789"), (carThree.make = "Audi");
      carThree.model = "A6";
      carThree.colour = "red";
      carThree.year = "2017";
      carThree.seats = "5";
      carThree.doors = "5";
      carThree.vehicleType = typeLuxury;
      carThree.location = locationTwo;
    
      //Movement Block
      let movementsC3 = new Movement();
      movementsC3.car = carThree;
      movementsC3.coordinates = locationTwo.coordinates;
      movementsC3.save({}).catch();
    
      carThree.movements = movementsC3;
      carThree.save({}).catch(function(err) {
        if (11000 === err.code || 11001 === err.code) {
          console.log("DB Error: Duplicate of car:", carThree.rego);
        }
      });      
    }
  });

  Car.findOne({'rego': 'DEF125'}, (error, car) => {
    if(!car) {
      let carFour = new Car();
      (carFour.rego = "DEF125"), (carFour.make = "Mazda");
      carFour.model = "CX-9";
      carFour.colour = "silver";
      carFour.year = "2017";
      carFour.seats = "5";
      carFour.doors = "5";
      carFour.vehicleType = typeSuv;
      carFour.location = locationThree;
    
      //Movement Block
      let movementsC4 = new Movement();
      movementsC4.car = carFour;
      movementsC4.coordinates = locationThree.coordinates;
      movementsC4.save({}).catch();
    
      carFour.movements = movementsC4;
      carFour.save({}).catch(function(err) {
        if (11000 === err.code || 11001 === err.code) {
          console.log("DB Error: Duplicate of car:", carFour.rego);
        }
      });     
    }
  });

  console.log('____ Seeded data wrap-up ____');
  User.count({}, (err, count) => {
    console.log('Number of seeded users:        ', count, '...')
  });
  Location.count({}, (err, count) => {
    console.log('Number of seeded locations:    ', count, '...')
  });
  Coordinate.count({}, (err, count) => {
    console.log('Number of seeded coords:       ', count, '...')
  });
  VehicleType.count({}, (err, count) => {
    console.log('Number of seeded vehicleTypes: ', count, '...')
  });
  Car.count({}, (err, count) => {
    console.log('Number of seeded cars        : ', count, '...')
  });
}
