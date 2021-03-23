'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { json } = require('body-parser');

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    password: String,
    email: String,
    mobile:String,
    role: String,
    group: String,
    profile: String,
    isActive:Boolean,
    status:Boolean,
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

        var query=[];
        var users;

         if(data.email)
         {
             query.push({$match:{"email":data.email}});
         }
         if(data.isActive)
         {
            query.push({$match:{"isActive":JSON.parse(data.isActive)}});
         }
         if(data.size)
         {
            query.push({$match:{"status":true}});
            query.push({$skip:0});
            query.push({$limit:parseInt(data.size)});

            users = await model.aggregate([
                query
            ]);

         }
         else
         {
            query.push({$match:{"status":true}});
            users = await model.aggregate([
                query
            ]);
        }

         return users;
    } catch(err) {
        return false
    }
};


const viewdeleteuserdetails = async() => {
    try {
        var users;
            users = await model.aggregate([
                {$match:{"status":false}}
            ]);
         return users;
    } catch(err) {
        return false
    }
};

const searchuserdetails = async(data) => {
    try {

        var query
       
        var users = await model.aggregate([

        {  $match: { $or: [{ firstname: data.data }, { lastname: data.data },{ email: data.data },{ mobile: data.data }] }}
              
        ]);
 
         return users;
    } catch(err) {
        return false
    }
};


const deleteuserdetails = async(data) => {
    try {
  
         const users = await model.updateMany(
            {"email" : data.email},
            {$set: {"status" : false,"createdOn": new Date()}},
            {new : true}
        );

         return users;
    } catch(err) {
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
                    "mobile":data.mobile,
                    "profile":data.profile,
                    "createdByName":data.createdByName,
                    "createdByRole":data.createdByRole,
                    "createdById":data.createdById,
                    "isActive" : true,
                    "status" : true,
                    "createdOn": new Date()}},
            {new : true}
        );

         return users;
    } catch(err) {

        console.log("hai")
        return false
    }
};

const updateactivestatus = async(data) => {
    try {

         const users = await model.updateMany(
            {"email" : data.email},
            {$set: {
                    "isActive" : data.isActive,
                    "status" : true,
                 }},
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
    updatepassworddetails,
    updateactivestatus,
    searchuserdetails,
    viewdeleteuserdetails
 };