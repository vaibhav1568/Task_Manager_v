const request = require('supertest')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')

const app = require('../src/app');
const {Task} = require('../src/model/task')
const {User} = require('../src/model/user')

const  userOneId = new mongoose.Types.ObjectId()
const  userOne ={
        _id:userOneId,
        name:"jogin User",
        email:"Jogin12.user@gmail.com",
        password: "userLogin@2030",
        tokens : [{
            token: jwt.sign({_id:userOneId},process.env.TASKMANAGER_JWT_SECRET)
        }]
}


beforeEach(async ()=>{
    await User.remove({},function(err){})
    await Task.remove({},function(err){})
    await new User(userOne).save();
})

test('Task Sample test case',async ()=>{
    
    await request(app)
                            .post('/tasks')
                            .set(`Authorization`,`Bearer ${userOne.tokens[0].token}`)
                            .send({
                                name:'From my Test'
                            })
                            .expect(201);

})