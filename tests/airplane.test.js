const supertest = require('supertest');
const app = require('../app');
const { default: mongoose } = require('mongoose');
const Airplane = require('../models/airplaneModel');
const User = require('../models/usersModel')
const api = supertest(app);
beforeAll(async () => {
    await Airplane.deleteMany({})
    await User.deleteMany({})
    await api.post('/api/users/register/')
        .send({
            name : 'Satish Pradhan',
            email: "1testuser@gmail.com",
            password: 'test123'
        })

    login = await api.post('/api/users/login')
        .send({
            username: "1testuser@gmail.com",
            password: "test123"
        })

    // token = login.body.token
});

describe('Airplane  API Tests', () => {
    // Test data for creating a menu
    const AirplaneData = {
        name: 'Boeing 747',
        number: '123',
        capacity: 122,
        from: 'Kathmandu',
        to: 'Singapore',
        journeyDate: '10 Aug',
        departure: 'ABC',
        arrival: 'adcd',
        type: 'economy',
        fare:12000,
        seatsBooked: [1,2,3,4],
        status:'Yet to Start'
    };

    test('Unauthorized users cannot get list of menus', async () => {
        await api.get('/api/airplanes/get-all-airplanes')
            .expect(401)
    })

    // test('Registered users can add menu', async () => {

    //     await api.post('/api/airplanes/')
    //         .send(Airplane)
    //         .set('authorization', `bearer ${token}`)
    //         .expect(200)

    // })

    // test('Registered users should get all menus', async () => {
    //     await api.get('/api/airplanes/')
    //         .set('authorization', `bearer ${token}`)
    //         .expect(200);
    // });

    // test('Registered users should get a menu by ID', async () => {
    //     const newMenu = await api.post('/menus/').send(menuData).set('authorization', `bearer ${token}`)
    //     const menuId = newMenu.body.id;
    //     await api.get(`menus/${menuId}`)
    //         .set('authorization', `bearer ${token}`)
    //         .expect(200)
    // });

    // test('Registered users should update a menu by ID', async () => {
    //     const newMenu = await api.post('/menus/').send(menuData).set('authorization', `bearer ${token}`)
    //     const menuId = newMenu.body.id;
    //     const updatedMenuData = {
    //         menuName: 'Cheeseburger',
    //         price: 12.99,
    //     };
    //     await api.put(`menus/${menuId}`).send(updatedMenuData)
    //         .set('authorization', `bearer ${token}`)
    //         .expect(200)

    // });
    // test('Registered users should delete a menu by ID', async () => {
    //     const newMenu = await api.post('/menus/').send(menuData).set('authorization', `bearer ${token}`)
    //     const menuId = newMenu.body.id;
    //     await api.delete(`menus/${menuId}`)
    //         .set('authorization', `bearer ${token}`)
    //         .expect(204)
    // });
    // test('Unauthorized users cannot delete a menus by ID', async () => {
    //     const nonExistentMenuId = '64ccdaa6ec3def2d2e2ebf40'
    //     res = await api.delete(`/menus/${nonExistentMenuId}`)
    //         .set('authorization', `bearer ${token}`)
    //         .expect(404)
    //     expect(res.body.error).toMatch("Menu not found")
    // });
    // test('Registered users should not update a menu without ID', async () => {
    //     const nonExistentMenuId = '64ccdaa6ec3def2d2e2ebf40'
    //     const updatedMenuData = {
    //         menuName: 'Cheeseburger',
    //         price: 12.99,
    //     };
    //     res = await api.put(`/menus/${nonExistentMenuId}`).send(updatedMenuData)
    //         .set('authorization', `bearer ${token}`)
    //         .expect(404)
    //     expect(res.body.error).toMatch("Menu not found")
    // });
});

afterAll(async () => mongoose.connection.close())
