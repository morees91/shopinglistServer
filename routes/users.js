var express = require('express');
var router = express.Router();
var users = require('../Controler/users')
/* GET users listing. */

router.post('/login',users.Login)




module.exports = router;
