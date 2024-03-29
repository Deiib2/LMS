const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const mongoose = require('mongoose')
const librarianRoutes = require('./routes/librarianRoutes')
const readerRoutes = require('./routes/readerRoutes')
const guestRoutes = require('./routes/guestRoutes')
const adminRoutes = require('./routes/adminRoutes')
const authRoutes = require('./routes/authRoutes')
app.use(express.json())
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
app.listen(process.env.PORT, () => {
    console.log('listening on port',process.env.PORT)
  })
})
.catch(err => console.log(err));

app.use('/api/librarian', librarianRoutes)
app.use('/api/reader', readerRoutes)
app.use('/api/guest', guestRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/auth', authRoutes)
