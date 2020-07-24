const express = require('express')
const connectDB = require('./config/db') // importing database

const app = express()

// connect database
connectDB()

// Initialize Middleware so that req.body gets converted to json in the routes
app.use(express.json( {extended: false} ))

app.get('/', (req, res)=>{
    res.send('API running')   
})

// Define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/todos', require('./routes/api/todos'))
app.use('/api/auth', require('./routes/api/auth'))

const PORT = process.env.PORT || 5000

app.listen(PORT , ()=>console.log(`Server started at port ${PORT}`))