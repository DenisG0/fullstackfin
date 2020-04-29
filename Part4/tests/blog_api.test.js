const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('Deleted')

  const blogObject = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)
  console.log('Done')
})
describe('Getting Blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blog')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('All blogs are returned', async () => {
    const response = await api.get('/api/blog')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the first blog is the art of war', async () => {
    const response = await api.get('/api/blog')

    expect(response.body[0].title).toBe('Range')
  })
})

describe('Individual blogs can be altered',() => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      "title":"Inspired",
      "author":"Martha Cagan",
      "url":"Inspired.com",
      "likes":"34"
    }
    await api
      .post('/api/blog')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const response = await helper.blogsInDb()
    // console.log("Response", response)
    // const titles = response.body.map(r => r.content)
    expect(response).toHaveLength(helper.initialBlogs.length + 1)
  })
  test('a specific blog can be viewed', async () => {
    const blogAtStart = await helper.blogsInDb()
    const blogToView = blogAtStart[0]
    const resultBlog = await api
      .get(`/api/blog/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(resultBlog.body).toEqual(blogToView)
  })
  test('a blog can be deleted', async () => {
    const blogAtStart = await helper.blogsInDb()
    const blogToDelete = blogAtStart[0]
    await api
      .delete(`/api/blog/${blogToDelete.id}`)
      .expect(204)
    const blogAtEnd = await helper.blogsInDb()
    expect(blogAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
    const titles = blogAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('Wrong blogs will be rejected', async () => {
  test('a blog always has zero likes', async () => {
    const newBlog = {
      "title":"Inspired",
      "author":"Martha Cagan",
      "url":"Inspired.com"
    }

    await api
      .post('/api/blog')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()
    // console.log("Response", response)
    const recentBlog = response.filter(r => r.title == "Inspired")

    expect(recentBlog[0].likes).toBe(0)
  })

  test('empty title will return 400', async () => {
    const newBlog = {
      "title":"Inspired",
      "author":"",
      "url":"Inspired.com"
    }

    await api
      .post('/api/blog')
      .send(newBlog)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})