// Cars.js
// Imports
import React, { Component, PropTypes } from 'react';
import styles from './Cars.css';

// component class
class Cars extends Component {
  constructor(props) {
    super(props);
    // hardcoded dummy data only
    this.state = { cars: createDummyData() };
  }

  render() {
    // Generate a list of vehicles
    const cars = this.state.cars;
    const cards = cars.map(
      (car) =>
        <div className="card" key={car.rego}>
          <h5 className="card-header">
            {car.year} {car.make} {car.model} ({car.colour})
          </h5>
          <div className="card-body">
            <div className="float-right">
              <button type="button" className="btn btn-primary btn-lg">Book</button>
            </div>
            <h6 className="card-subtitle">
              Location: {car.location.name}
            </h6>
            <p className="card-text">
              Vehicle type: {car.vehicleType.name}, {car.doors} doors<br/>
              Seats: {car.seats}<br/>
              Hourly rate: ${car.vehicleType.hourlyRate}<br/>
              Registration: {car.rego}
            </p>
          </div>
        </div>
    );

    return (
      <div className="col-sm">
        {cards}
      </div>
    );
  }
}

function createDummyData ()
{
  let vehicleType1 =
  {
    name: "small",
    hourlyRate: 7,
  };

  let location1 =
  {
    name: "Sydney Airport",
    coordinates:
    {
      latitude: "-33.947346",
      longitude: "151.179428",
    },
  };

  let car1Movement =
  {
    car: car1,
    coordinates:
    {
      latitude: "-33.947346",
      longitude: "151.179428",
    },
    date: Date.now,
  };

  let car1 =
  {
    rego: "ABC123",
    make: "Hyundai",
    model: "Getz",
    colour: "white",
    year: "2017",
    seats: 5,
    doors: 3,
    vehicleType: vehicleType1,
    location: location1,
    movements: [ car1Movement ],
  };

  let vehicleType2 =
  {
    name: "sports",
    hourlyRate: 8.75,
  };

  let car2 =
  {
    rego: "ABC456",
    make: "Mazda",
    model: "MX-5",
    colour: "blue",
    year: "2017",
    seats: 2,
    doors: 2,
    vehicleType: vehicleType2,
    location: location1,
    movements: [ car1Movement ],
  };

return [car1, car2];
}

export default Cars;
