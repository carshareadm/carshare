import * as http from '../util/http';

// manage cars methods
const updateCar = (car) => {
  return http
  .client()
  .put(`/manage/cars/${car._id}`, car);
};

const getAllCars = () => {
  return http
  .client()
  .get(`/manage/cars`);
};

const cars = {
  updateCar: updateCar,
  getAll: getAllCars,
};
// end - manage cars

// manage locations
const getAllLocations = () => {
  return http
  .client()
  .get(`/manage/locations`);
};

const locations = {
  getAll: getAllLocations,
};
// end - manage locations

// manage vehicleTypes
const getAllVehicleTypes = () => {
  return http
  .client()
  .get(`/manage/vehicletypes`);
};

const vehicleTypes = {
  getAll: getAllVehicleTypes,
};
// end - manage vehicleTypes

module.exports = {
  cars: cars,
  locations: locations,
  vehicleTypes: vehicleTypes,
};