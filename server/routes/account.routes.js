const register = require('../controllers/register.controller');
var express = require('express')
var router = express.Router()


router.post('/register', register.register);

module.exports = router;