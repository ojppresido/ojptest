

module.exports = function(req, res, next) {
    if(!req.staff.admin) return res.status(403).send('Access Denied. You are Not An Admin');
    next();
};