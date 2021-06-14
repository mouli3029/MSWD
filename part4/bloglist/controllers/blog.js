const Blog = require('../models/blog')
const blogRouter = require('express').Router()


blogRouter.get('/', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(err => next(err))
})

blogRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(err => next(err))
})
blogRouter.delete('/:id', (req, res, next) => {
  Blog.findByIdAndRemove(req.params.id)
    .then((response) => {
      console.log(response)
      return res.status(200).json(response)
    })
    .catch((error) => next(error))
})
module.exports = blogRouter