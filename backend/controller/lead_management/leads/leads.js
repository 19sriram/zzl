'use strict';

const httpErrors = require('http-errors');
const leads = require('./service');
const bcrypt = require('bcrypt');
var uuid = require('uuid-random');


const addlead = async (req, res) => {
    try {

        var date = new Date();
        req.body.leadId=uuid();
        req.body.isActive = true;
        req.body.leadStatus="CREATED";

        var status=[{
            status:"CREATED",
            date:date.toISOString().slice(0,10) +" "+ date.toISOString().slice(11,19)
        }];
        req.body.status_history=status;
        req.body.createdOn=date.toISOString().slice(0,10) +" "+ date.toISOString().slice(11,19);
        
        const savelead = await leads.saveleaddetails(req.body)
        if(savelead){
            res.send({ status: 200, result: "Success", message: 'lead Added Successfully!'});
        }
        else{
            res.send({ status: 400, result: "Failure", Message: 'Some Thing Went Wrong!'});
        }

    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};

const viewlead = async (req, res) => {
    try {

        const viewlead = await leads.viewleaddetails(req.query);
        if(viewlead.length!=0){
            res.send({ status: 200, result: 'Success', data:viewlead});
        }
        else{
            res.send({ status: 200, result: 'Failure', message:"Data Not Found"});
        }

    } catch(err) {
        res.send({ status: 400, result:'Failure', message: 'Some Thing Went Wrong!'}); 
    }
};


const updatelead = async (req, res) => {
    try {
        const checkExists = await leads.viewleaddetails({lead:req.body.lead})
        if(checkExists.length===0){
            res.send({ status: 200, result: "Failure", message: 'lead Not Found!'}); 
            return false           
        }
        const updatelead = await leads.updateleaddetails(req.body)
        if(updatelead){
            res.send({ status: 200, result: "Success", message: 'lead Updated Successfully!'});
        }
        else{
            res.send({ status: 400, result: "Failure", Message: 'Some Thing Went Wrong!'});
        }

    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};



module.exports = {
     addlead,
     viewlead,
     updatelead,
   

};