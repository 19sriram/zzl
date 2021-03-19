'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const roleSchema = mongoose.Schema({
    role: String,
    reportingTo: String,
    shareDateToPears: Boolean,
    description: String,
    isActive:Boolean,
    createdById:String,
    createdByRole:String,
    createdByName:String,
    createdOn:String,
  });

const model = mongoose.model('roles', roleSchema);


const saveroledetails = async(data) => {
    try {
        const user = new model(data);
        const savedata = await user.save();
        return savedata;
    } catch(err) {
        return false
    }
};

const viewroledetails = async(data) => {
    try {
      
        var query={};
        var roles;

         if(data.role)
         {
             query=data;
             query.isActive=true;
             roles = await model.find(query).collation( { locale: 'en', strength: 2 } );
         }
         else
         {
            query.isActive=true;
            roles = await model.find(query);

         }
       
         return roles;
         
    } catch(err) {

        console.log("hai1")
        return false
    }
};

const viewroletreedetails = async(data) => {
    try {
     
        var query={};

         if(data.role)
         {
            query.reportingTo=data.role; 
         }
         else
         {
            query.reportingTo=""; 
         }
         query.isActive=true;
         const roles = await model.find(query)
         return roles;
    } catch(err) {
        return false
    }
};

const updateroledetails = async(data) => {
    try {
        console.log("hai1")
         const roles = await model.updateMany(
            {"role" : data.role},
            {$set: {"role":data.role,
                    "reportingTo":data.reportingTo,
                    "description":data.description,
                    "createdByName":data.createdByName,
                    "createdByRole":data.createdByRole,
                    "createdById":data.createdById,
                    "isActive" : true,
                    "createdOn": new Date()}},
            {new : true}
        );

         return roles;
    } catch(err) {

        console.log("hai")
        return false
    }
};

module.exports = { 
    saveroledetails,
    viewroledetails,
    updateroledetails,
    viewroletreedetails
 };