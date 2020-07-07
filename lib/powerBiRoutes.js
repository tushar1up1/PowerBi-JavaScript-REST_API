var powerbiCntrl = require('./powerbiController');
var router = require('express').Router();

router.route('/embedToken')
    .post(powerbiCntrl.powerbiToken);
