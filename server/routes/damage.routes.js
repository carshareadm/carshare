const damage = require("../controllers/damage/damage.controller");
var express = require("express");
var router = express.Router();


router.post('/:Booking/createDamage', damage.createDamage);
router.get('/:Booking/showDamage', damage.showDamage);

module.exports = router;
