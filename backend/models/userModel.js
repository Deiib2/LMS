const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, {timestamps: true})

userSchema.statics.Login = async function (email, password) {
    if (!email || !password)
      throw Error('Must type email or password')
  
    const user = await this.findOne({ email })
    if (!user)
      throw Error('Incorrect email or password')
  
    const validpass = await bcrypt.compare(password, user.password)
    if (!validpass)
      throw Error('incorrect email or password')
  
    return user
  }

module.exports = mongoose.model('User', userSchema)