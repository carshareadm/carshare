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
  
  //1st User is userOne
  
  let userOne = new user();
  userOne.email= "carshareuserOne@gmail.com";
  userOne.mobile= "0412345678";
  userOne.password="shacar";
  userOne.isAdmin= true;
  userOne.save(function(err) {
    if (11000 === err.code || 11001 === err.code) {
      console.log("DB Error: Duplicate of user:",userOne.email);
    }
  });

  //TestUsers
  /*
  Added in next pull
  let userTwo = new user();
  userTwo.email="user1@test.com";
  userTwo.mobile="0411111111";
  userTwo.password="user1";
  userTwo.license=new license();
  userTwo.address=new address();
  userTwo.creditCard=new creditCard;
  userTwo.confirmationCodes=new confirmationCode;
  userTwo.save(function(err) {
    if (11000 === err.code || 11001 === err.code) {
      console.log("DB Error: Duplicate of user:",userOne.email);
    }
  });
  

  */



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

    // add vehicle types if not already in the system
  let typeSmall = new vehicleType();
  typeSmall.name = "small";
  typeSmall.hourlyRate = 7;
  typeSmall.save(
    function(err) {
      if (11000 === err.code || 11001 === err.code) {
        console.log("DB Error: Duplicate of type:",typeSmall.name);
      }
    }
  );

  let typeSports = new vehicleType();
  typeSports.name = "sports";
  typeSports.hourlyRate = 8.75;
  typeSports.save(
    function(err) {
      if (11000 === err.code || 11001 === err.code) {
        console.log("DB Error: Duplicate of type:",typeSports.name);
      }
    }
  );
  let typeLuxury = new vehicleType();
  typeLuxury.name = "luxury";
  typeLuxury.hourlyRate = 10.5;
  typeLuxury.save(
    function(err) {
      if (11000 === err.code || 11001 === err.code) {
        console.log("DB Error: Duplicate of type:",typeLuxury.name);
      }
    }
  );
  let typeSuv = new vehicleType();
  typeSuv.name = "suv";
  typeSuv.hourlyRate = 10.5;
  typeSuv.save(
    function(err) {
      if (11000 === err.code || 11001 === err.code) {
        console.log("DB Error: Duplicate of type:",typeSuv.name);
      }
    }
  );
  // add cars if there are none already in the system

  let carOne = new car();
  carOne.rego="ABC123",
  carOne.make="Hyundai";
  carOne.model="Getz";
  carOne.colour="white";
  carOne.year="2017";
  carOne.seats="5";
  carOne.doors="3";
  carOne.vehicleType=typeSmall;
  carOne.location=locationOne;
  carOne.movements=new movement();
  carOne.movements.car=carOne;
  carOne.location=locationOne;
  carOne.save(function(err) {
    if (11000 === err.code || 11001 === err.code) {
      console.log("DB Error: Duplicate of car:",carOne.rego);
    }
  });;
  
  let carTwo = new car();
  carTwo.rego="ABC456",
  carTwo.make="Mazda";
  carTwo.model="MX-5";
  carTwo.colour="blue";
  carTwo.year="2017";
  carTwo.seats="5";
  carTwo.doors="5";
  carTwo.vehicleType=typeSports;
  carTwo.location=locationOne;
  carTwo.movements=new movement();
  carTwo.movements.car=carTwo;
  carTwo.location=locationOne;
  carTwo.save(function(err) {
    if (11000 === err.code || 11001 === err.code) {
      console.log("DB Error: Duplicate of car:",carTwo.rego);
    }
  });
  
  let carThree = new car();
  carThree.rego="ABC789",
  carThree.make="Audi";
  carThree.model="A6";
  carThree.colour="red";
  carThree.year="2017";
  carThree.seats="5";
  carThree.doors="5";
  carThree.vehicleType=typeLuxury;
  carThree.location=locationTwo;
  carThree.movements=new movement();
  carThree.movements.car=carThree;
  carThree.location=locationTwo;
  carThree.save(function(err) {
    if (11000 === err.code || 11001 === err.code) {
      console.log("DB Error: Duplicate of car:",carThree.rego);
    }
  });
  

  let carFour = new car();
  carFour.rego="DEF125",
  carFour.make="Mazda";
  carFour.model="CX-9";
  carFour.colour="silver";
  carFour.year="2017";
  carFour.seats="5";
  carFour.doors="5";
  carFour.vehicleType=typeSuv;
  carFour.location=locationThree;
  carFour.movements=new movement();
  carFour.movements.car=carFour;
  carFour.location=locationThree;
  carFour.save(function(err) {
    if (11000 === err.code || 11001 === err.code) {
      console.log("DB Error: Duplicate of car:",carFour.rego);
    }
  });
  
}
