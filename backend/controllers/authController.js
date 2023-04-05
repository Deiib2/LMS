const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')

const signIn = async (req, res) => {
    const {email, password} = req.body
    console.log(email, password)
    try{
        const user = await User.Login(email, password)
        const token = jwt.sign({_id: user._id}, process.env.SECRET, {expiresIn: '3d'})
        res.status(200).json({email,type: user.type,token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    signIn
}