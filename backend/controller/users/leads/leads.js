'use strict';

const httpErrors = require('http-errors');
const leads = require('../leads/service');
const bcrypt = require('bcrypt');


const addlead = async (req, res) => {
    try {

        const checkExists = await leads.viewleaddetails({lead:req.body.lead})

        if(checkExists.length!=0){
            res.send({ status: 200, result: "Failure", message: 'lead Already Exists!'}); 
            return false           
        }

        req.body.isActive = true;
        req.body.createdOn = new Date();

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