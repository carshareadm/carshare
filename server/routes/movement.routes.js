const movement = require("../controllers/movement/movement.controller");
var express = require("express");
var router = express.Router();


router.post('/create', movement.createMovement);

module.exports = router;