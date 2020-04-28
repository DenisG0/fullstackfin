const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((a,b) => {
    return a + b.likes
  },0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((a,b) => {
    return a.likes>b.likes?a:b
  },[])
}

const mostBlogs = (blogs) => {

}

const mostLikes = (blogs) => {
  var topblog = blogs.reduce((a,b) => {
    return a.likes>b.likes?a:b
  },[])
  var maxLikes = 0
  blogs.forEach(ele => {
    if(ele.author === topblog.author){
      maxLikes+=ele.likes
    }
  })
  return {
    author:topblog.author,
    likes:maxLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}