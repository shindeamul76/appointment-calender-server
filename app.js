const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./database/connect')

// middlewears
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

//routers
const userRoute = require('./routes/User')

app.use('/api/v1', userRoute)


// connection of database and server
const start = async () => {
    try {

        await connectDB(process.env.MONGO_URI);
        app.listen(process.env.PORT, ()=> console.log(`server is running on port ${process.env.PORT}...`))
        
    } catch (error) {
        console.log(error)
    }
}

start();
