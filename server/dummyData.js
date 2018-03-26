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

  const errorCode1 = 11000; 
  const errorCode2 = 11001; 

  User.count({}, (err, count) => {
    if (count < 1) {
      console.log('Adding users...');

      let user1 = new User();
      user1.email = "carshareadm@gmail.com";
      user1.mobile = "0412345678";
      user1.password = "shacar";
      user1.isAdmin = true;
      user1.save({}).catch(function(err) {
        if (errorCode1 === err.code || errorCode2 === err.code) {
          console.log("Duplicate of user:", user1.email);
        }
      });
    
      //TestUsers
    
      let user2 = new User();
      user2.email = "user1@test.com";
      user2.mobile = "0411111111";
      user2.password = "user1";
    
      //User2 license block
      let licenseU2 = new License();
      licenseU2.licenseNumber = "ABC123456";
    
      let imagelicenseU2 = new Image();
      //user2 image block
      imagelicenseU2.fileHandle = "user2";
      imagelicenseU2.extension = "jpg";
      imagelicenseU2.save({}).catch(function(err) {
        if (errorCode1 === err.code || errorCode2 === err.code) {
          console.log("Duplicate of license:", imagelicenseU2.fileHandle);
        }
      });
      licenseU2.image = imagelicenseU2;
      licenseU2.save().catch((e) => { console.log(e)});
      user2.license = licenseU2;
    
      let addressU2 = new Address();
      //user2 address block
      addressU2.street1 = "1 Dickson place";
      addressU2.street2 = "";
      (addressU2.suburb = "Dickson"), (addressU2.state = "ACT");
      addressU2.postCode = "2602";
      addressU2.save().catch((e) => { console.log(e)});
      user2.address = addressU2;
    
      let creditCardU2 = new CreditCard();
      //user2 address block
      creditCardU2.cardNumber = " 3778 123456 12345";
      creditCardU2.nameOnCard = "user2";
      creditCardU2.ccv = "3547";
      creditCardU2.expiryMonth = 12;
      creditCardU2.expiryYear = 2020;
      creditCardU2.save().catch((e) => { console.log(e)});
      user2.creditCard = creditCardU2;
    
      let confirmationCodeU2 = new ConfirmationCode();
      confirmationCodeU2.code = "ABC123456789";
      confirmationCodeU2.user = user2;
      confirmationCodeU2.expiresAt = "2018-05-01";
      confirmationCodeU2.save().catch((e) => { console.log(e)});
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
  Location.findOne({'name': nameLocation1})
          .populate('coordinates')
          .exec((error, location) => {
            if (!location) {
              let coordinate1 = new Coordinate();
              /* coordinate1 only used within location1 creation
              no need to be set if location is already found
              */
              console.log('Adding', nameLocation1, '...');
              coordinate1.latitude = "-33.947346";
              coordinate1.longitude = "151.179428";
              coordinate1.save().catch((e) => { console.log(e)});
              location1.name = nameLocation1;
              location1.coordinates = coordinate1;
              location1.save().catch((e) => { console.log(e)});
            }
            else {
              console.log("Location \'", nameLocation1, "\' already exists.");
              location1 = location;
            }
          });
  
  let location2 = new Location();
  
  var nameLocation2 = "Melbourne Airport";
  Location.findOne({'name': nameLocation2})
          .populate('coordinates')
          .exec((error, location) => {
            if (!location) {
              let coordinate2 = new Coordinate();
               /* coordinate2 only used within location2 creation
              no need to be set if location is already found
              */
              console.log('Adding', nameLocation2, '...');
              coordinate2.latitude = "-37.669012";
              coordinate2.longitude = "144.841027";
              coordinate2.save().catch((e) => { console.log(e)});
              location2.name = nameLocation2;
              location2.coordinates = coordinate2;
              location2.save().catch((e) => { console.log(e)});
            }
            else {
              console.log("Location \'", nameLocation2, "\' already exists.");
              location2 = location;
            }
          });

  let location3 = new Location();

  var nameLocation3 = "Perth Airport";
  Location.findOne({'name': nameLocation3})
  .populate('coordinates')
  .exec((error, location) => {
    if (!location) {
      let coordinate3 = new Coordinate();
      /* coordinate2 only used within location2 creation
      no need to be set if location is already found
      */
     console.log('Adding', nameLocation3, '...');
      coordinate3.latitude = "-31.953512";
      coordinate3.longitude = "115.857048";
      coordinate3.save().catch((e) => { console.log(e)});
      location3.name = nameLocation3;
      location3.coordinates = coordinate3;
      location3.save().catch((e) => { console.log(e)});
    }
    else {
      console.log("Location \'", nameLocation3, "\' already exists.");
      location3 = location;
    }
  }); 

  // add vehicle types if not already in the system
  let typeSmall = new VehicleType();
  var nameCarType1 = "small";
  VehicleType.findOne({'name': nameCarType1}, (error, vehicleType) => {
    if(!vehicleType) {
      typeSmall.name = nameCarType1;
      typeSmall.hourlyRate = 7;
      typeSmall.save().catch((e) => { console.log(e)});   
    }
    else {
      console.log("vehicleType \'", nameCarType1, "\' already exists.");
      typeSmall = vehicleType;
    }
  });


  let typeSports = new VehicleType();
  var nameCarType2 = "sports";
  VehicleType.findOne({'name': nameCarType2}, (error, vehicleType) => {
    if(!vehicleType) {
      typeSports.name = nameCarType2;
      typeSports.hourlyRate = 8.75;
      typeSports.save().catch((e) => { console.log(e)});      
    }
    else {
      console.log("vehicleType \'", nameCarType2, "\' already exists.");
      typeSports = vehicleType;
    }
  });

  let typeLuxury = new VehicleType();
  var nameCarType3 = "luxury";
  VehicleType.findOne({'name': nameCarType3}, (error, vehicleType) => {
    if(!vehicleType) {
      typeLuxury.name = nameCarType3;
      typeLuxury.hourlyRate = 10.5;
      typeLuxury.save().catch((e) => { console.log(e)});
    }
    else {
      console.log("vehicleType \'", nameCarType3, "\' already exists.");
      typeLuxury = vehicleType; //Links variable to existing type
    }
  });


  let typeSuv = new VehicleType();
  var nameCarType4 = "suv";
  VehicleType.findOne({'name': nameCarType4}, (error, vehicleType) => {
    if(!vehicleType) {
      typeSuv.name = nameCarType4;
      typeSuv.hourlyRate = 10.5;
      typeSuv.save().catch((e) => { console.log(e)});
    }
    else {
      console.log("vehicleType \'", nameCarType4, "\' already exists.");
      typeSuv = vehicleType;
    }
  });


  // add cars if there are none already in the system
  var regoC1 = 'ABC123';
  Car.findOne({'rego': regoC1}, (error, car) => {
    if(!car) {
      let car1 = new Car();
      (car1.rego = regoC1), (car1.make = "Hyundai");
      car1.model = "Getz";
      car1.colour = "white";
      car1.year = "2017";
      car1.seats = "5";
      car1.doors = "3";
      car1.vehicleType = typeSmall;
      car1.location = location1;
      car1.movements = new Movement();
      car1.movements.car = car1;
      //Movement Block
      let movementsC1 = new Movement();
      movementsC1.car = car1;
      movementsC1.coordinates = location1.coordinates;
      movementsC1.save().catch((e) => { console.log(e)});
    
      car1.movements = movementsC1;
      car1.save().catch((e) => { console.log(e)});
    }
    else
    {
      console.log("Car \'", regoC1, "\' already exists.");
    }
  });

  var regoC2 = 'ABC456';
  Car.findOne({'rego': regoC2}, (error, car) => {
    if(!car) {
      let car2 = new Car();
      (car2.rego = regoC2), (car2.make = "Mazda");
      car2.model = "MX-5";
      car2.colour = "blue";
      car2.year = "2017";
      car2.seats = "5";
      car2.doors = "5";
      car2.vehicleType = typeSports;
      car2.location = location1;
    
      //Movement Block
      let movementsC2 = new Movement();
      movementsC2.car = car2;
      movementsC2.coordinates = location1.coordinates;
      movementsC2.save().catch((e) => { console.log(e)});
    
      car2.movements = movementsC2;
      car2.save().catch((e) => { console.log(e)});

    }
    else
    {
      console.log("Car \'", regoC2, "\' already exists.");
    }
  });

  //Car 3 data Block
  var regoC3 = 'ABC789';
  Car.findOne({'rego': regoC3}, (error, car) => {
    if(!car) {
      let car3 = new Car();
      (car3.rego = regoC3), (car3.make = "Audi");
      car3.model = "A6";
      car3.colour = "red";
      car3.year = "2017";
      car3.seats = "5";
      car3.doors = "5";
      car3.vehicleType = typeLuxury;
      car3.location = location2;
    
      //Movement Block
      let movementsC3 = new Movement();
      movementsC3.car = car3;
      movementsC3.coordinates = location2.coordinates;
      movementsC3.save().catch((e) => { console.log(e)});
    
      car3.movements = movementsC3;
      car3.save().catch((e) => { console.log(e)});

    }
    else
    {
      console.log("Car \'", regoC3, "\' already exists.");
    }
  });

  //Car 4 data Block
  var regoC4 = 'DEF125';
  Car.findOne({'rego': regoC4}, (error, car) => {
    if(!car) {
      let car4 = new Car();
      (car4.rego = regoC4), (car4.make = "Mazda");
      car4.model = "CX-9";
      car4.colour = "silver";
      car4.year = "2017";
      car4.seats = "5";
      car4.doors = "5";
      car4.vehicleType = typeSuv;
      car4.location = location3;
    
      //Movement Block
      let movementsC4 = new Movement();
      movementsC4.car = car4;
      movementsC4.coordinates = location3.coordinates;
      movementsC4.save().catch((e) => { console.log(e)});
    
      car4.movements = movementsC4;

      car4.save().catch((e) => { console.log(e)});
    }
    else
    {
      console.log("Car \'", regoC4, "\' already exists.");
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
