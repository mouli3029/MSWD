const { response } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./blog_helper');
const Blog = require('../models/blog');
const blogRouter = require('../controllers/blog');
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    /* let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[3])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[4])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[5])
    await blogObject.save() */

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArry = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArry)

}, 60000)

describe('HTTP GET TESTING', () => {
    test('check whether it returns the correct no of blog posts in JSON format', async () => {
        const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
        expect(response.body).toHaveLength(6)
    })

    test('check that the unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined();
    })
})

describe('HTTP POST Testing', () => {
    test('check new blog is added and count of total no of blogs increased by one', async () => {
        const newBLog = {
            title: "React Redux",
            author: "Mouli",
            url: "https://reactredux.com/",
            likes: 5
        }
        await api.post('/api/blogs')
            .send(newBLog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const titles = response.body.map(b => b.title)
        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    })
})

afterAll(() => {
    mongoose.connection.close()
})