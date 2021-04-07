'use strict';
const express = require('express');
const router = express.Router();
const user = require('../controller/lead_management/users/users');
const role = require('../controller/lead_management/roles/roles');
const lead = require('../controller/lead_management/leads/leads');
const lov = require('../controller/lead_management/lov/lov');

const auth = require('./auth');


let routes = (app) => {
    router.post("/adduser",auth, user.adduser);
    router.get('/viewuser',auth,user.viewuser);
    router.get('/viewdeleteuser',auth,user.viewdeleteuser);
    router.get('/searchuser',auth,user.searchuser);
    router.post('/deleteuser',auth,user.deleteuser);
    router.post('/updateuser',auth,user.updateuser);
    router.post('/updateactivestatus',user.updateactivestatus);
    router.post('/login',user.userlogin);
    router.post('/addrole',auth,role.addrole);
    router.get('/viewrole',auth, role.viewrole);
    router.post('/updaterole',auth,role.updaterole);
    router.post('/updatepassword',auth, user.updatepassword);
    router.get('/getroletree',auth, role.getroletree);
    router.post('/sendpassword',auth,user.sendpassword);
    
    router.post('/addlead',auth, lead.addlead);
    router.get('/viewlead',auth, lead.viewlead);
    router.post('/updateleadstatus',auth,lead.updateleadstatus);
    router.get('/viewleadstatus',auth,lead.viewleadstatus);
    router.post('/addnotification',auth,lead.addnotification);
    router.get('/viewnotification',auth,lead.viewnotification);


    router.get('/viewsources',auth,lov.viewsource);
    router.get('/viewindustry',auth,lov.viewindustry);

  app.use("/api/user", router);
};

module.exports = routes;