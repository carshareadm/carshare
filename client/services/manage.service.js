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

const updateCarImage = (car, image) => {
  return http
  .client()
  .put(`/manage/cars/${car._id}/image/${image._id}`, car, image);
};

const cars = {
  updateCar: updateCar,
  getAll: getAllCars,
  updateCarImage: updateCarImage,
};
// end - manage cars

// manage damages
const getAllDamages = (carid) => {
  return http
  .client()
  .get(`/manage/damages?carId=${carid || ''}`);
};

const updateDamage = (damageid) => {
  return http
  .client()
  .put(`/manage/damages/${damageid}`, {});
};

const damages = {
  getAll: getAllDamages,
  updateDamage: updateDamage,
};

// end - manage damages

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

const newLocation = (location) => {
  return http
  .client()
  .post(`/manage/locations`, location);
};

const locations = {
  getAll: getAllLocations,
  updateLocation: updateLocation,
  newLocation: newLocation,
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

// manage bookings methods
const updateBooking = (booking) => {
  return http
  .client()
  .put(`/manage/bookings/${booking._id}`, booking);
};

const getAllBookings = () => {
  return http
  .client()
  .get(`/manage/bookings`);
};

const bookings = {
  updateBooking: updateBooking,
  getAll: getAllBookings,
};
// end - manage bookings

// manage offers methods
const updateOffer = (offer) => {
  return http
  .client()
  .put(`/manage/offers/${offer._id}`, offer);
};

const getAllOffers = () => {
  return http
  .client()
  .get(`/manage/offers`);
};

const offers = {
  updateOffer: updateOffer,
  getAll: getAllOffers,
};
// end - manage offers

module.exports = {
  cars: cars,
  locations: locations,
  users: users,
  licenses: licenses,
  vehicleTypes: vehicleTypes,
  bookings: bookings,
  offers: offers,
  damages: damages,
};