const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuthLibrarian = async (req, res, next) => {
    const { authorization } = req.headers
    if(!authorization) {
        return res.status(401).json({error: 'You must be logged in'})
    }
    const token = authorization.split(' ')[1]
    try{
        const {_id} = jwt.verify(token,process.env.SECRET)
        const {Type} = await User.findOne({_id}).select('type')
        if(Type !== 'librarian' )
            return res.status(401).json({error:'Only Librarians can access this functionality'})
        req.user = await User.findOne({_id}).select('_id')
        next()
    }
    catch(error){
        console.log(error)
        res.status(401).json({error:'Request is  not authorized'})
    }
}

module.exports = requireAuthLibrarian