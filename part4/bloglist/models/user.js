const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name : {
        type : String
    },
    username : {
        type : String,
    },
    passwordHash : {
        type : String,
    }
})

UserSchema.set('toJSON',{
    transform :(document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString();

        delete returnedObject._id;
        delete returnedObject.__v;

        delete returnedObject.passwordHash;
    }
})

const User = mongoose.model('User',UserSchema)
module.exports = User;