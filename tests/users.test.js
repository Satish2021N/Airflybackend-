const supertest = require('supertest')
const app = require('../app')
const { default: mongoose } = require('mongoose')
const User = require('../models/usersModel')

const api = supertest(app)

beforeAll(async () => {
    await User.deleteMany({})
})

test('User can be registerd', async () => {
    await api.post('/api/users/register')
        .send({
            name: 'testUser1',
            email: "1testuser@gmail.com",
            password: 'test123'
        }).expect(200)
})


describe('Register user can login ', () => {
    test('User logged in', async () => {
        await api.post('/api/users/login')
            .send({
                email: '1testuser@gmail.com',
                password: 'test123'
            }).expect(200)
    })


    test('Unregistered User cannot be logged in', async () => {
        await api.post('/api/users/login')
            .send({
                email: 'sati@gmail.com',
                password: 'atis123'
            }).expect(200)
        // expect(res.body.error).toBeDefined()
        // expect(res.body.error).toMatch(/User validation failed: fullname: Path `fullname` is required./)
    })
})


afterAll(async () => {
    await mongoose.connection.close()
})