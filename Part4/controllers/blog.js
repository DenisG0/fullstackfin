const  blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async(request, response) => {
  const blog = await Blog.find({})
  response.json(blog.map(blog => blog.toJSON()))
})

blogRouter.get('/:id', async(request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog.toJSON())
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
  const savedBlog = await blog.save()
  response.json(savedBlog.toJSON())
})

blogRouter.delete('/:id', async(request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async(request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(savedBlog.toJSON())
})

module.exports = blogRouter