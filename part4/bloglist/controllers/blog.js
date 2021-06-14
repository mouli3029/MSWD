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
blogRouter.delete('/:id', async (req, res, next) => {
  const blog = await Blog.findById(req.params.id)
  if(!blog){
    return res.status(404).json({error : "No data found"})
  }

   await Blog.findByIdAndRemove(req.params.id)
   .then((response) => {
      console.log(response)
      return res.status(200).json(response)
    })
    .catch((error) => next(error))
})

blogRouter.put('/:id', async (req,res,next)=>{
  const blog = await Blog.findById(req.params.id)
  if(!blog){
    return res.status(404).json({error : "No data found"})
  }
  await Blog.findByIdAndUpdate(req.params.id,req.body,{new : true})
  .then(response => res.status(200).json(response))
  .catch(error => next(error))
})
module.exports = blogRouter