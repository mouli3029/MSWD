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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}