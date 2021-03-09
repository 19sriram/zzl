'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    password: String,
    email: String,
    role: String,
    group: String,
    profile: String,
    isActive:Boolean,
    createdById:String,
    createdByRole:String,
    createdByName:String,
    createdOn:String,
  });

const model = mongoose.model('users', userSchema);


const saveuserdetails = async(data) => {
    try {
        const user = new model(data);
        const savedata = await user.save();
        return savedata;
    } catch(err) {
        return false
    }
};

const viewuserdetails = async(data) => {
    try {

        var query={};

         if(data.email)
         {
             query=data;
         }
         query.isActive=true;
         const users = await model.find(query);

         return users;
    } catch(err) {

        console.log("hai")
        return false
    }
};

const deleteuserdetails = async(data) => {
    try {
  
         const users = await model.updateMany(
            {"email" : data.email},
            {$set: {"isActive" : false,"createdOn": new Date()}},
            {new : true}
        );

         return users;
    } catch(err) {

        console.log("hai")
        return false
    }
};

const updateuserdetails = async(data) => {
    try {
        console.log("hai")
         const users = await model.updateMany(
            {"email" : data.email},
            {$set: {"firstname":data.firstname,
                    "lastname":data.lastname,
                    "role":data.role,
                    "group":data.group,
                    "profile":data.profile,
                    "createdByName":data.createdByName,
                    "createdByRole":data.createdByRole,
                    "createdById":data.createdById,
                    "isActive" : true,
                    "createdOn": new Date()}},
            {new : true}
        );

         return users;
    } catch(err) {

        console.log("hai")
        return false
    }
};

const updatepassworddetails = async(data) => {
    try {
  
         const users = await model.updateMany(
            {"email" : data.email},
            {$set: {"password" : data.password,"createdOn": new Date()}},
            {new : true}
        );

         return users;
    } catch(err) {

        console.log("hai")
        return false
    }
};

module.exports = { 
    saveuserdetails,
    viewuserdetails,
    deleteuserdetails,
    updateuserdetails,
    updatepassworddetails
 };