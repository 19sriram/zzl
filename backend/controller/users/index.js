'use strict';
const express = require('express');
const router = express.Router();
const user = require('./users/users');
const role = require('./roles/roles');

router.post('/adduser', user.addUser);
router.get('/viewuser', user.viewUser);
router.post('/deleteuser', user.deleteUser);
router.post('/updateuser', user.updateUser);
router.post('/login', user.userLogin);
router.post('/addrole', role.addRole);
router.get('/viewrole', role.viewRole);
router.post('/updaterole', role.updateRole);
router.post('/updatepassword', user.updatePassword);


module.exports = router;