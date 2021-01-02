const request = require('supertest');
const {Staff} = require('../../module/staff');
let server;
// const get = require('../../route/staffs');

describe('/staff', ()=>{
    beforeEach(()=>{server = require('../../index');})
    afterEach(async()=>{
        server.close();
        await Staff.remove({});
    });

    describe('get /', ()=>{ 
        it('should get list of staffs in the dadabase', async ()=>{
           await Staff.collection.insertMany([
                {name: 'staffname1'},
                {name: 'staffname2'},
                {name: 'staffname3'}
            ]);
  

             const res = await request(server).get('/staff');
             expect(res.status).toBe(200);
             expect(res.body.length).toBe(3);
             expect(res.body.some(j=>j.name==='staffname1')).toBeTruthy();
             expect(res.body.some(j=>j.name==='staffname2')).toBeTruthy();
             expect(res.body.some(j=>j.name==='staffname3')).toBeTruthy();
        });
    });


describe('get /:id', ()=>{
    it('should return stass with id', async()=>{
        const staff = new Staff({inecNo: 'Adamolekun'});
        await staff.save();
    
        const res = await request(server).get('/staff/' + staff._id);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('inecNo', staff.inecNo);
    });


    it('should return 404 if invalid id is input', async()=>{
    
        const res = await request(server).get('/staff/1');
        expect(res.status).toBe(404);
    });

});


describe('post /', ()=>{
    it('should return 401 if body validation not in agreement', async()=>{
        const res = await request(server).post('/staff').send({name: 'staff1'});
        expect(res.status).toBe(401);

    });

    it('should return 400 if staff already registered', async()=>{
        const staff = new Staff({inecNo: 'staff1'});
        await staff.save();
        const res = await request(server).post('/staff').send({inecNo: 'staff1'});
        if(res===staff.inecNo)
        expect(res.status).toBe(400);

    });
});
}); 