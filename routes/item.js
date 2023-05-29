var express = require('express');
var router = express.Router();
var item = require('../Controler/Item')


router.post('/AddItem',item.AddItem)

router.get('/Items',item.GetItem)


module.exports = router;