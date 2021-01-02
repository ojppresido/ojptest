const jwt = require('jsonwebtoken');
const { Staff } = require('../module/staff');


module.exports = function (req, res, next){
    const token = req.header('x-Authent');
    if(!token) return res.status(401).send('Access Denied. No token Provided');

    try{
    const access = jwt.verify(token, 'ojppresido');
    req.staff = access;
    next();
    }
    catch(ex) {
        res.status(403).send('Unauthorized Task! Please Exit!');
    };
};



