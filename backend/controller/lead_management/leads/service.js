'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const leadSchema = mongoose.Schema({
    leadId:String,
    leadOwner: String,
    company: String,
    firstName: String,
    lastName: String,
    title: String,
    email: String,
    phone: String,
  /*  fax: String,*/
    mobile: String,
    website: String,
    leadSource: String,
    leadStatus: String,
    industry: String,
   /* employeeCount: Number,
    annualRevenue: String,
    rating: String,
    skypeId: String,
    secondaryEmail: String,
    twitterId: String,*/
   address:String,
  /*  street: String,
    city: String,*/
    state: String,
    zipcode: String,
    country: String,
    description: String,
    status_history:Array,
    isActive:Boolean,
    createdById:String,
    createdByRole:String,
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
     
        var query=[];
        query.push({$match:{"isActive":true}})

         if(data.leadId)
         {
            query.push({$match:{"leadId":data.leadId}})
        }
        const leads = await model.aggregate([
            query
        ]);  
        return leads;
    } catch(err) {
        return false
    }
};

const updateleadstatus = async(data) => {
    try {

         const leads = await model.updateMany(
            {"leadId" : data.leadId},
            {$set: {"status_history":data.status_history,
                    }},
            {new : true}
        );

         return leads;
    } catch(err) {

        return false
    }
};

const viewleadstatusdetails = async(data) => {
    try {
     
        var query=[];
        query.push({$match:{"isActive":true}})

         if(data.leadId)
         {
            query.push({$match:{"leadId":data.leadId}})
        }
       query.push({$project:{statushistory:"$status_history"}})
        const leads = await model.aggregate([
            query,
            
        ]);  
        return leads;
    } catch(err) {
        return false
    }
};

const notificationSchema = mongoose.Schema({
    leadId:String,
    leadOwner: String,
    company: String,
    firstName: String,
    lastName: String,
    title: String,
    email: String,
    phone: String,
  /*  fax: String,*/
    mobile: String,
    website: String,
    leadSource: String,
    leadStatus: String,
    industry: String,
   /* employeeCount: Number,
    annualRevenue: String,
    rating: String,
    skypeId: String,
    secondaryEmail: String,
    twitterId: String,*/
   address:String,
  /*  street: String,
    city: String,*/
    state: String,
    zipcode: String,
    country: String,
    description: String,
    status_history:Array,
    isActive:Boolean,
    createdById:String,
    createdByRole:String,
    createdByName:String,
    createdOn:String,
  });

  const model1 = mongoose.model('notification', notificationSchema);


const savenotificationdetails = async(data) => {
    try {
        const notification = new model1(data);
        const savedata = await user.save();
        return savedata;
    } catch(err) {
        return false
    }
};

const viewnotificationdetails = async(data) => {
    try {
     
        var query=[];
        query.push({$match:{"isActive":true}})

         if(data.userId)
         {
            query.push({$match:{"userId":data.userId}})
        }
        const notification = await model1.aggregate([
            query
        ]);  
        return notification;
    } catch(err) {
        return false
    }
};


module.exports = { 
    saveleaddetails,
    viewleaddetails,
    updateleadstatus,
    viewleadstatusdetails,
    savenotificationdetails,
    viewnotificationdetails
 };