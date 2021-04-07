'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sourcesSchema = mongoose.Schema({
    name: String,
    isActive:Boolean,
  
  });

const model = mongoose.model('sources', sourcesSchema);

const viewsourcesdetails = async() => {
    try {
        console.log("hai")
        var query={};
        var sources;
        query.isActive=true;
        sources = await model.find(query);
        console.log("hello")
        console.log(sources)
         
         return sources;   
    } catch(err) {
        return false
    }
};

const industrySchema = mongoose.Schema({
    name: String,
    isActive:Boolean,
  
  });

const model1 = mongoose.model('industry', industrySchema,'industry');

const viewindustrydetails = async() => {
    try {
        var query={};
        var industry;
        query.isActive=true;
        industry = await model1.find(query);
    
         return industry;   
    } catch(err) {
        return false
    }
};


module.exports = { 
    viewsourcesdetails,
    viewindustrydetails
 
 };