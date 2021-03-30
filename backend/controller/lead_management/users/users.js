'use strict';

const httpErrors = require('http-errors');
const users = require('./service');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rajeshworldstar@gmail.com',
      pass: 'tqfcjsrxxxaivwlz'
    }
  });


const adduser = async (req, res) => {
    try {

        const checkExists = await users.viewuserdetails({email:req.body.email})

        if(checkExists.length!=0){
            res.send({ status: 400, result: "Failure", message: 'User Already Exists!'}); 
            return false           
        }
         
        var password = 'Admin@123';
        req.body.createdOn = '';
        req.body.isActive = true;
        req.body.status = true;
        var date = new Date();

        req.body.createdOn=date.toISOString().slice(0,10) +" "+ date.toISOString().slice(11,19);

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

const viewuser = async (req, res) => {
    try {
        const viewuser = await users.viewuserdetails(req.query)
        if(viewuser.length!=0){
            res.send({ status: 200, result: 'Success', data:viewuser});
        }
        else{
            res.send({ status: 400, result: 'Failure', message:"Data Not Found"});
        }

    } catch(err) {
        res.send({ status: 400, result:'Failure', message: 'Some Thing Went Wrong!'}); 
    }
};

const viewdeleteuser = async (req, res) => {
    try {
        const viewdeleteuser = await users.viewdeleteuserdetails()
        if(viewdeleteuser.length!=0){
            res.send({ status: 200, result: 'Success', data:viewdeleteuser});
        }
        else{
            res.send({ status: 400, result: 'Failure', message:"Data Not Found"});
        }

    } catch(err) {
        res.send({ status: 400, result:'Failure', message: 'Some Thing Went Wrong!'}); 
    }
};

const searchuser = async (req, res) => {
    try {
        const searchuser = await users.searchuserdetails(req.query)
        if(searchuser.length!=0){
            res.send({ status: 200, result: 'Success', data:searchuser});
        }
        else{
            res.send({ status: 400, result: 'Failure', message:"Data Not Found"});
        }

    } catch(err) {
        res.send({ status: 400, result:'Failure', message: 'Some Thing Went Wrong!'}); 
    }
};

const deleteuser = async (req, res) => {
    try {
        const checkExists = await users.viewuserdetails({email:req.body.email})
        if(checkExists.length===0){
            res.send({ status: 400, result: "Failure", message: 'User Not Found!'}); 
            return false           
        }
        var date = new Date();

        req.body.createdOn=date.toISOString().slice(0,10) +" "+ date.toISOString().slice(11,19);
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



const updateuser = async (req, res) => {
    try {
        const checkExists = await users.viewuserdetails({email:req.body.email})
        if(checkExists.length===0){
            res.send({ status: 400, result: "Failure", message: 'User Not Found!'}); 
            return false           
        }
        var date = new Date();

        req.body.createdOn=date.toISOString().slice(0,10) +" "+ date.toISOString().slice(11,19);
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

const updateactivestatus = async (req, res) => {
    try {
        const checkExists = await users.viewuserdetails({email:req.body.email})
        if(checkExists.length===0){
            res.send({ status: 400, result: "Failure", message: 'User Not Found!'}); 
            return false           
        }
        const updateactivestatus = await users.updateactivestatus(req.body)
        if(updateactivestatus){
            res.send({ status: 200, result: "Success", message: 'Status Updated Successfully!'});
        }
        else{
            res.send({ status: 400, result: "Failure", Message: 'Some Thing Went Wrong!'});
        }

    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};

const updatepassword = async (req, res) => {
    try {
        const checkExists = await users.viewuserdetails({email:req.body.email})
        if(checkExists.length===0){
            res.send({ status: 400, result: "Failure", message: 'User Not Found!'}); 
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

const userlogin = async (req, res) => {
    try {

        const getUser = await users.viewuserdetails({email:req.body.email});

        if(getUser.length === 0)
        {
            res.send({ status: 400, result: "Failure", message: 'User Not Found!'}); 
            return false 
        }
     
        const match = await bcrypt.compare(req.body.password, getUser[0].password);
    
        if (match) { 
            const token = JWT.sign({ id: getUser[0].id,role:getUser[0].role }, process.env.JWT_SECRET_KEY);
            res.send({ status: 200, result:"Success" ,message: "LoggedIn Successfully!", accessToken: token });
        } else { 
            res.send({ status: 400, result:"Failure", message: "Incorrect Password!" });
        }

    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};

const sendpassword = async (req, res) => {
    try {
        const viewuser = await users.viewuserdetails(req.body)
        if(viewuser.length!=0){
            var mailOptions = {
                from: 'rajeshworldstar@gmail.com',
                to: 'rajeshsvce3993@gmail.com',
                subject: 'Temporary Password',
                text: 'Password:Aa123!@#'
              };
              const salt = await bcrypt.genSalt(10);
              const hashedPassword = await bcrypt.hash('Aa123!@#', salt);
              req.body.password = hashedPassword;
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log(req.body)
                    const updatepassword =  users.updatepassworddetails(req.body)
                    res.send({ status: 200, result:"Success", message: "Email Sent Successfully" });                }
              });
              
        }
        else{
            res.send({ status: 400, result: 'Failure', message:"Email ID Not Found"});
        }

    } catch(err) {
        res.send({ status: 400, result:'Failure', message: 'Some Thing Went Wrong!'}); 
    }
};

module.exports = {
     adduser,
     viewuser,
     deleteuser,
     updateuser,
     updatepassword,
     userlogin,
     updateactivestatus,
     searchuser,
     viewdeleteuser,
     sendpassword
     

};