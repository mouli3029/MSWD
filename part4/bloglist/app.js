const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger');
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blog')


mongoose.connect(config.MONGODB_URI,{useNewUrlParser : true,useCreateIndex:true,useFindAndModify:false,useUnifiedTopology:true})
.then(()=>{
    logger.info('Successfully connected to database');
})
.catch(err => {
    logger.error("Error connection",err.message)
})

// Middlewares
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

// Routes :
app.use('/api/blogs',blogRouter)


// Error handlers thrown by routeHandlers
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app;