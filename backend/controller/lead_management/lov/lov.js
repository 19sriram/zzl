'use strict';

const httpErrors = require('http-errors');
const lov = require('./service');
const bcrypt = require('bcrypt');


const viewsource = async (req, res) => {
    try {

        const viewsource = await lov.viewsourcesdetails();
        if(viewsource.length!=0){
            res.send({ status: 200, result: 'Success', data:viewsource});
        }
        else{
            res.send({ status: 400, result: 'Failure', message:"Data Not Found"});
        }

    } catch(err) {
        res.send({ status: 400, result:'Failure', message: 'Some Thing Went Wrong!'}); 
    }
};


const viewindustry = async (req, res) => {
    try {

        const viewindustry = await lov.viewindustrydetails();
        if(viewindustry.length!=0){
            res.send({ status: 200, result: 'Success', data:viewindustry});
        }
        else{
            res.send({ status: 400, result: 'Failure', message:"Data Not Found"});
        }

    } catch(err) {
        res.send({ status: 400, result:'Failure', message: 'Some Thing Went Wrong!'}); 
    }
};
module.exports = {
     viewsource,
     viewindustry
};