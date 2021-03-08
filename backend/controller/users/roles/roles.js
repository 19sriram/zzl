'use strict';

const httpErrors = require('http-errors');
const roles = require('../roles/service');
const bcrypt = require('bcrypt');


const addRole = async (req, res) => {
    try {

        const checkExists = await roles.viewroledetails({role:req.body.role})

        if(checkExists.length!=0){
            res.send({ status: 200, result: "Failure", message: 'Role Already Exists!'}); 
            return false           
        }

        req.body.isActive = true;
        req.body.createdOn = new Date();

        const saverole = await roles.saveroledetails(req.body)
        if(saverole){
            res.send({ status: 200, result: "Success", message: 'Role Added Successfully!'});
        }
        else{
            res.send({ status: 400, result: "Failure", Message: 'Some Thing Went Wrong!'});
        }

    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};

const viewRole = async (req, res) => {
    try {

        const viewrole = await roles.viewroledetails(req.query);
        if(viewrole.length!=0){
            res.send({ status: 200, result: 'Success', data:viewrole});
        }
        else{
            res.send({ status: 200, result: 'Failure', message:"Data Not Found"});
        }

    } catch(err) {
        res.send({ status: 400, result:'Failure', message: 'Some Thing Went Wrong!'}); 
    }
};


const updateRole = async (req, res) => {
    try {
        const checkExists = await roles.viewroledetails({role:req.body.role})
        if(checkExists.length===0){
            res.send({ status: 200, result: "Failure", message: 'Role Not Found!'}); 
            return false           
        }
        const updaterole = await roles.updateroledetails(req.body)
        if(updaterole){
            res.send({ status: 200, result: "Success", message: 'Role Updated Successfully!'});
        }
        else{
            res.send({ status: 400, result: "Failure", Message: 'Some Thing Went Wrong!'});
        }

    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};

module.exports = {
     addRole,
     viewRole,
     updateRole,

};