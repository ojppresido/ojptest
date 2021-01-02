
const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');




const staffSchema = new mongoose.Schema({
    surname: String,
    firstname: String,
    dateOfAppointment: Date,
    inecNo: String,
    cadre: String,
    position: String,
    levelStep: String,
    phone: String,
    username: String,
    password: String,
    email: String,
    admin: Boolean
});

staffSchema.methods.generateAuthent = function() {
    const token = jwt.sign({inecNo: this.inecNo, admin: this.admin, _id: this._id}, 'ojppresido');
    return token;
};


const Staff = mongoose.model('SAGINEC', staffSchema);

function validate(staff) {
    const schema = Joi.object({
        surname: Joi.string().required().max(25),
        firstname: Joi.string().required().max(25),
        dateOfAppointment: Joi.date(),
        cadre: Joi.string().required().max(25),
        position: Joi.string().required().max(35),
        levelStep: Joi.string().required().max(25),
        phone: Joi.string().required().max(11).min(11),
        username: Joi.string().required().max(25),
        password: Joi.string().required().max(25),
        inecNo: Joi.string().required().max(25),
        email: Joi.string().email()
            
    });
    return schema.validate(staff);
};


module.exports.Staff = Staff;
module.exports.validate = validate;