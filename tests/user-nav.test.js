const request = require('supertest')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')

const app = require('../src/app');
const {User} = require('../src/model/user')
const {Task} = require('../src/model/task')

const  userOneId = new mongoose.Types.ObjectId()
const  userOne ={
        _id:userOneId,
        name:"jogin User",
        email:"Jogin.user@gmail.com",
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

test('Should signup a new user',async ()=>{
    await request(app).post('/users').send({
        name:"Navdeep Singh",
        email:"navdeep.singh12@gmail.com",
        password: "tesTs@pass20"
    }).expect(201);
})


test('Should login existing user', async ()=>{
    await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password
    }).expect(200);
})

//Test login failure with non existing user.

test('Should not login with wrong credentials', async()=>{
    await request(app).post('/users/login').send({
        email:userOne.email,
        password:'IncorrectPassword'
    }).expect(400);
})

test('Should get profile details for user',async()=>{
    await request(app).get('/users/me')
                .set(
                  `Authorization`,`Bearer ${userOne.tokens[0].token}`      
                )
                .send()
                .expect(200);
})

test('Should not get profile with unauthorized user', async()=>{
    await request(app).get('/users/me')
                  .send()
                  .expect(401);
})

test('Should delete the authorized user', async()=>{
    await request(app).delete('/users/me')
                .set(
                    'Authorization',`Bearer ${userOne.tokens[0].token}`
                )
                .send()
                .expect(200);
})

test('Should not delete the unauthorized user', async()=>{
    await request(app).delete('/users/me')
                .send()
                .expect(401);
})
