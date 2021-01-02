const { Staff } = require('../../../module/staff');
const jwt = require('jsonwebtoken');
const config = require('config');

describe('generateAuthent', ()=>{
    it('should generate authentification token for staff', ()=>{
        const payload = {inecNo: 'a', admin: true};
        const staff = new Staff(payload);
        const token = staff.generateAuthent();
        const decoded = jwt.verify(token, 'ojppresido');
        expect(decoded).toMatchObject(payload)



    });
});