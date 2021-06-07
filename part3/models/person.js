const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
require('dotenv').config();

const mongoUrl = process.env.MONGODB_URI

// Connection
mongoose.connect(mongoUrl,{useUnifiedTopology :true,useCreateIndex:true,useFindAndModify:false,useNewUrlParser:true})
.then(result => {
    console.log('Connection to Mongo successfully')
})
.catch(err => {
    console.log("Error connection to mongo :",err.message)
})

// Schema Def
const  PersonSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        minlength : 3,
    },
    number : {
        type : String,
        required : true,
        minlength : 8,
    },
})

PersonSchema.set('toJSON',{
    transform : (document , returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
PersonSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Person',PersonSchema);