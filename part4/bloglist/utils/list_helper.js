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

module.exports = {
    dummy,
    totalLikes
}