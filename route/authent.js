
const { Staff }= require('../module/staff');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');
const route = express.Router();


route.use(express.json());



// route.get('/', async(req, res)=>{
//     const staff = await Staff.find();
//     res.send(staff);
    
// });





route.post('/', async (req, res)=>{
    const { error } = validateAuth(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const staff = await Staff.findOne({ inecNo: req.body.inecNo });
    if(!staff) return res.status(400).send('Invalid ID or Password');

    const password = await bcrypt.compare(req.body.password, staff.password);
    if(!password) return res.status(400).send('Invalid ID or Password');

    const token = staff.generateAuthent();
    res.header('x-Authent', token).send(token);
});


function validateAuth(req) {
    const schema = Joi.object({
        inecNo: Joi.string().required(),
        password: Joi.string().required()
    });
    return schema.validate(req);
};






















module.exports = route;