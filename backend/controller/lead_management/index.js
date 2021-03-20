'use strict';
const express = require('express');
const router = express.Router();
const user = require('./users/users');
const role = require('./roles/roles');
const lead = require('./leads/leads');


router.post('/adduser',user.adduser);
router.get('/viewuser',user.viewuser);
router.post('/deleteuser',user.deleteuser);
router.post('/updateuser',user.updateuser);
router.post('/updateactivestatus',user.updateactivestatus);
router.post('/login',user.userlogin);
router.post('/addrole',role.addrole);
router.get('/viewrole', role.viewrole);
router.post('/updaterole',role.updaterole);
router.post('/updatepassword', user.updatepassword);
router.get('/getroletree', role.getroletree);
router.post('/addlead', lead.addlead);




module.exports = router;