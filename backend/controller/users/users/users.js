'use strict';

const httpErrors = require('http-errors');
const users = require('./service');
const bcrypt = require('bcrypt');



const addUser = async (req, res) => {
    try {

        const checkExists = await users.viewuserdetails({email:req.body.email})

        if(checkExists.length!=0){
            res.send({ status: 200, result: "Failure", message: 'User Already Exists!'}); 
            return false           
        }
         
        var password = 'Admin@123';
        req.body.createdOn = '';
        req.body.isActive = true;
        req.body.createdOn = new Date();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        const saveuser = await users.saveuserdetails(req.body)
        if(saveuser){
            res.send({ status: 200, result: "Success", message: 'User Added Successfully!'});
        }
        else{
            res.send({ status: 400, result: "Failure", Message: 'Some Thing Went Wrong!'});
        }

    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};

const viewUser = async (req, res) => {
    try {

        const viewuser = await users.viewuserdetails(req.query)
        if(viewuser.length!=0){
            res.send({ status: 200, result: 'Success', data:viewuser});
        }
        else{
            res.send({ status: 200, result: 'Failure', message:"Data Not Found"});
        }

    } catch(err) {
        res.send({ status: 400, result:'Failure', message: 'Some Thing Went Wrong!'}); 
    }
};

const deleteUser = async (req, res) => {
    try {
        const checkExists = await users.viewuserdetails({email:req.body.email})
        if(checkExists.length===0){
            res.send({ status: 200, result: "Failure", message: 'User Not Found!'}); 
            return false           
        }
        const deleteuser = await users.deleteuserdetails(req.body)
        if(deleteuser){
            res.send({ status: 200, result: "Success", message: 'User Deleted Successfully!'});
        }
        else{
            res.send({ status: 400, result: "Failure", Message: 'Some Thing Went Wrong!'});
        }

    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};


const updateUser = async (req, res) => {
    try {
        const checkExists = await users.viewuserdetails({email:req.body.email})
        if(checkExists.length===0){
            res.send({ status: 200, result: "Failure", message: 'User Not Found!'}); 
            return false           
        }
        const updateuser = await users.updateuserdetails(req.body)
        if(updateuser){
            res.send({ status: 200, result: "Success", message: 'User Updated Successfully!'});
        }
        else{
            res.send({ status: 400, result: "Failure", Message: 'Some Thing Went Wrong!'});
        }

    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};

const updatePassword = async (req, res) => {
    try {
        const checkExists = await users.viewuserdetails({email:req.body.email})
        if(checkExists.length===0){
            res.send({ status: 200, result: "Failure", message: 'User Not Found!'}); 
            return false           
        }

         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(req.body.password, salt);
         req.body.password = hashedPassword;

        const updatepassword = await users.updatepassworddetails(req.body)
        if(updatepassword){
            res.send({ status: 200, result: "Success", message: 'Password Updated Successfully!'});
        }
        else{
            res.send({ status: 400, result: "Failure", Message: 'Some Thing Went Wrong!'});
        }

    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};

module.exports = {
     addUser,
     viewUser,
     deleteUser,
     updateUser,
     updatePassword

};