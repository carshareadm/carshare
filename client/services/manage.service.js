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

const updateLocation = (location) => {
  return http
  .client()
  .put(`/manage/locations/${location._id}`, location);
};

const locations = {
  getAll: getAllLocations,
  updateLocation: updateLocation,
};
// end - manage locations

// manage users
const getAllUsers = () => {
  return http
  .client()
  .get(`/manage/users`);
};

const updateUser = (user) => {
  return http
  .client()
  .put(`/manage/users/${user._id}`, user);
};

const users = {
  getAll: getAllUsers,
  updateUser: updateUser,
};
// end - manage locations

// license
const getLicense = (id) => {
  return http
  .client()
  .get(`/license/${id}`);
};

const licenses = {
  getById: getLicense,
};

// end - license

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
  users: users,
  licenses: licenses,
  vehicleTypes: vehicleTypes,
};