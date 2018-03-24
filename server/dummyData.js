/* Import dbScheme */
import address from './models/address';
import booking from './models/booking';
import car from './models/car';
import confirmationCode from './models/confirmationCode';
import coordinate from './models/coordinate';
import creditCard from './models/creditCard';
import damageReport from './models/damageReport';
import enquiry from './models/enquiry';
import image from './models/image';
import license from './models/license';
import location from './models/location';
import movement from './models/movement';
import user from './models/user';
import vehicleType from './models/vehicleType';


export default function () {
  // add dummy data here
  // see http://mongoosejs.com/docs/queries.html for an intro on how to query mongoDb using mongoose
  // see http://mongoosejs.com/docs/models.html for intro on how to add/save data

  // add an admin user if there is not one already in the system... preferably using carshareadm@gmail.com
  
  
  let admin = new user();
  admin.email= "carshareadmin@gmail.com";
  admin.mobile= "0412345678";
  admin.password="shacar";
  admin.isAdmin= true;
  admin.save(function(err, result) {
    if (11000 === err.code || 11001 === err.code) {
      console.log("DB Error: Duplicate of user:",admin.email);
    }
  });


  // add locations if there are none already in the system

  let locationOne = new location();
  let coordinateOne = new coordinate();
  coordinateOne.latitude="-33.947346";
  coordinateOne.longitude="151.179428";
  coordinateOne.save();
  locationOne.name="Sydney Airport";
  locationOne.coordinates=coordinateOne;
  locationOne.save();

  let locationTwo = new location();
  let coordinateTwo = new coordinate();
  coordinateTwo.latitude="-37.669012";
  coordinateTwo.longitude="144.841027";
  coordinateTwo.save();
  locationTwo.name="Melbourne Airport";
  locationTwo.coordinates=coordinateTwo;
  locationTwo.save();

  let locationThree = new location();
  let coordinateThree = new coordinate();
  coordinateThree.latitude="-31.953512";
  coordinateThree.longitude="115.857048";
  coordinateThree.save();
  locationThree.name="Perth Airport";
  locationThree.coordinates=coordinateThree;
  locationThree.save();

  // add cars if there are none already in the system
  let smallcar = new vehicleType();
  smallcar.name = "small";
  smallcar.hourlyRate = 7;
  smallcar.save(
    function(err, result) {
      if (11000 === err.code || 11001 === err.code) {
        console.log("DB Error: Duplicate of type:",smallcar.name);
      }
    }
  );

  let sportscar = new vehicleType();
  sportscar.name = "sports";
  sportscar.hourlyRate = 8.75;
  sportscar.save(
    function(err, result) {
      if (11000 === err.code || 11001 === err.code) {
        console.log("DB Error: Duplicate of type:",sportscar.name);
      }
    }
  );
  let luxurycar = new vehicleType();
  luxurycar.name = "luxury";
  luxurycar.hourlyRate = 10.5;
  luxurycar.save(
    function(err, result) {
      if (11000 === err.code || 11001 === err.code) {
        console.log("DB Error: Duplicate of type:",luxurycar.name);
      }
    }
  );
  let suvcar = new vehicleType();
  suvcar.name = "suv";
  suvcar.hourlyRate = 10.5;
  suvcar.save(
    function(err, result) {
      if (11000 === err.code || 11001 === err.code) {
        console.log("DB Error: Duplicate of type:",suvcar.name);
      }
    }
  );
}
