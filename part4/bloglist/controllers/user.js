const UserRouter = require('express').Router()
const User = require('../models/user');
const bcrypt = require('bcrypt');

UserRouter.post('/',async (req,res,next)=>{
    const body = req.body;
    const rounds = 10;
    const passwordHash = await bcrypt.hash(body.password,rounds)
    const user = new User({...body, passwordHash});
    await user.save()
        .then(response=>{
            res.status(201).json(response)
        })
        .catch(err =>{
            next(err);
        })
})

UserRouter.get('/',async (req,res,next)=>{
    await User.find({})
    .then(users=>{
        res.status(200).json(users)
    })
    .catch(err => {
        next(err)
    })
})

module.exports = UserRouter;