const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('check whether it returns the correct amount of blog posts in JSON format', () => {
    test('check whether it returns the blog posts in JSON format', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})


afterAll(() => {
    mongoose.connection.close()
})