'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const leadSchema = mongoose.Schema({
    leadOwner: String,
    company: String,
    firstName: String,
    lastName: String,
    title: String,
    email: String,
    phone: String,
    fax: String,
    mobile: String,
    website: String,
    leadSource: String,
    leadStatus: String,
    industry: String,
    employeeCount: String,
    annualRevenue: String,
    rating: String,
    isActive:Boolean,
    createdById:String,
    createdBylead:String,
    createdByName:String,
    createdOn:String,
  });

const model = mongoose.model('leads', leadSchema);


const saveleaddetails = async(data) => {
    try {
        const user = new model(data);
        const savedata = await user.save();
        return savedata;
    } catch(err) {
        return false
    }
};

const viewleaddetails = async(data) => {
    try {
      
        var query={};

         if(data.email)
         {
             query=data;
         }
         query.isActive=true;
         const leads = await model.find(query)
         return leads;
         
    } catch(err) {

        console.log("hai1")
        return false
    }
};

const viewleadtreedetails = async(data) => {
    try {
     
        var query={};

         if(data.lead==='null')
         {
             query.reportingTo="";
         }
         else
         {
            query.reportingTo=data.lead;   
         }
         query.isActive=true;
         const leads = await model.find(query)
         return leads;
    } catch(err) {
        return false
    }
};

const updateleaddetails = async(data) => {
    try {
        console.log("hai1")
         const leads = await model.updateMany(
            {"lead" : data.lead},
            {$set: {"lead":data.lead,
                    "reportingTo":data.reportingTo,
                    "description":data.description,
                    "createdByName":data.createdByName,
                    "createdBylead":data.createdBylead,
                    "createdById":data.createdById,
                    "isActive" : true,
                    "createdOn": new Date()}},
            {new : true}
        );

         return leads;
    } catch(err) {

        console.log("hai")
        return false
    }
};

module.exports = { 
    saveleaddetails,
    viewleaddetails,
    updateleaddetails,
    viewleadtreedetails
 };