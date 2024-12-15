const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors')
const connectDb = require('./config/dbCollection')
const authRoute = require('./routes/authRoutes')
const expenseRoute = require('./routes/expenseRoutes')

const app = express()
connectDb()

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 5000

app.use('/api/auth', authRoute)
app.use('/api/expenses', expenseRoute)

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
})