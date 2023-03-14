const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const Librarian = require('../models/librarianModel')

const registerAdmin = async (req, res) => {
    const {email, password} = req.body;
    const type = 'admin'
    try{
        let user = await User.findOne({email})
        if(user) {
            return res.status(400).json({error: 'User already exists'})
        }
        else{
            const salt = await bcrypt.genSalt(10)
            let hash = await bcrypt.hash(password, salt)
            const newAdmin = await User.create({email, password: hash, type})
            res.status(200).json(newAdmin)
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const registerLibrarian = async (req, res) => {
    const {email, password, name} = req.body;
    const type = 'librarian'
    try{
        let user = await User.findOne({email})
        if(user) {
            return res.status(400).json({error: 'User already exists'})
        }
        else{
            const salt = await bcrypt.genSalt(10)
            let hash = await bcrypt.hash(password, salt)
            const newLibrarian = await User.create({email, password: hash, type})
            const newLib2 = await Librarian.create({_id: newLibrarian._id, name})
            res.status(200).json(newLibrarian)
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    registerLibrarian,
    registerAdmin
}