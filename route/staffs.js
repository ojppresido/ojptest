const _= require('lodash');
const handler = require('../middleware/tryCatch');
const {Staff, validate} = require('../module/staff');
const {List, listMark} = require('../middleware/List');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Author = require('../middleware/author');
const Admin = require('../middleware/admin');
const mongoose  = require('mongoose');
const ObjectId = require('../middleware/validateObjectId');

router.use(express.json());



router.get('/', /*[Author, Admin],*/ async(req, res)=>{
    const staff = await Staff.find();
    res.send(staff);
    
   });

   router.get('/list', /*[Author, Admin],*/ async(req, res)=>{
    const list = await List.find();
    res.send(list);
    
   });

   router.post('/list', /*[Author, Admin],*/ async(req, res)=>{
    const {error} = listMark(req.body);
    if(error) return res.status(401).send(error.message);

    let list = await List.findOne({inecNo: req.body.inecNo});
    if(list) return res.status(400).send('User Already Registered');

    list = new List({inecNo: req.body.inecNo});

    await list.save();
        res.send('Sucessful Input');

});


   router.get('/:id', ObjectId,  /*[Author, Admin],*/ async(req, res)=>{
    const staff = await Staff.findById(req.params.id);
    if(!staff)return res.status(404).send('Not a valid Id');

    res.send(staff);
    
   }); 


   router.get('/me',/* Author,*/ async(req, res)=>{

    // throw new Error('Could not Connect because of Malicious Attitude');
    const staff = await Staff.findById(req.staff._id).select('-password');
    res.send(staff);
   });



router.post('/', async(req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(401).send(error.message);

    let check = await List.findOne({inecNo: req.body.inecNo});
    if(!check) return res.status(404).send('You are not a staff of INECSAGAMU');

    let staff = await Staff.findOne({inecNo: req.body.inecNo});
    if(staff) return res.status(400).send('User Already Registered');

    staff = new Staff(_.pick(req.body, ['surname', 'firstname', 'dateOfAppointment',
        'inecNo', 'cadre', 'position', 'levelStep', 'phone', 'username', 'password', 'email']));

    const salt = await bcrypt.genSalt(2);
    staff.password = await bcrypt.hash(staff.password, salt);
    await staff.save();
        const token = staff.generateAuthent();
        res.header('x-Authent', token).send(_.pick(staff, ['position','surname', 'username',  'inecNo', 'levelStep', 'phone',]));
    
});
















module.exports = router;