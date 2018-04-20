const damage = require("../controllers/damage/damage.controller");
var express = require("express");
var router = express.Router();


router.post('/:booking/createDamage', damage.createDamage);
router.get('/:booking/showDamage', damage.showDamage);

module.exports = router;
