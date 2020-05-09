const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    "title":"The Art of War",
    "author":"Sun-Tzu",
    "url":"artofwar.com",
    "likes":"31"
  },
  {
    "title":"Range",
    "author":"Kevin Epistein",
    "url":"generalist.com",
    "likes":"120"
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ "title" :"Give me More", })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}


module.exports = {
  initialBlogs, nonExistingId, blogsInDb , usersInDb
}