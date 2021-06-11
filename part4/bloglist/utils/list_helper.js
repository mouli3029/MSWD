
const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    let totallikes;
    blogs.length === 0 ? 
    totallikes = 0 
    :
    totallikes = blogs.reduce((accumulator,currentValue)=> accumulator + currentValue.likes,0)
    return totallikes
}

const favoriteBlog = (blogs) => {
    const maxLikes = blogs.reduce((sum,value)=> Math.max(sum,value.likes),0)
    const favoriteblog = blogs.find(blog => blog.likes === maxLikes)
    console.log("MAX LIKES : ", maxLikes," FAV BLOG", favoriteblog)
    return {
        title : favoriteblog.title,
        author: favoriteblog.author,
        likes : favoriteblog.likes,
    };
    // return favoriteblog
}

const mostBlogs = (blogs) => {
    let countObject = {}
    blogs.forEach((blog)=>{
        if(countObject[blog.author] !== undefined){
            countObject[blog.author] += 1;
        }
        else{
            countObject[blog.author] = 0;
        }
    })
    const maxBlogs = Math.max(...Object.values(countObject))
    const maxBloggedAuthor = Object.keys(countObject).filter((author)=> countObject[author] === maxBlogs)
    return{
        author : maxBloggedAuthor[0],
        blogs : maxBlogs + 1
    }
}

const mostLikes = (blogs) => {
    let countObject = {}
    blogs.forEach((blog)=>{
        if(countObject[blog.author] !== undefined){
            countObject[blog.author] += blog.likes;
        }
        else{
            countObject[blog.author] = blog.likes;
        }
    })
    const maxLikes = Math.max(...Object.values(countObject))
    const maxLikedAuthor = Object.keys(countObject).filter((author)=> countObject[author] === maxLikes)
    return{
        author : maxLikedAuthor[0],
        likes : maxLikes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}