const mongoose = require("mongoose");
const Joi = require('joi');



const listSchema = new mongoose.Schema({
   
    inecNo: String,
    
});
const List = mongoose.model('SAGLIST', listSchema);

// const list = [{inecNo: 'INEC/OG/PP.1034'}, {inecNo: 'INEC/OG/PP.1020'}]



function listvalidate(list) {
    const schema = Joi.object({
        
        inecNo: Joi.string().required().max(25),
            
    });
    return schema.validate(list);
};

module.exports.List = List;
module.exports.listvalidate = listvalidate;