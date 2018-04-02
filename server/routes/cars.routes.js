const cars = require("../controllers/cars/cars.controller");
var express = require("express");
var router = express.Router();

router.get("/", cars.getCars);

module.exports = router;