const express = require("express");
//Imporing dotenv
require("dotenv").config();

//Importing Userroutes
const usersRoute = require("./routes/usersRoutes");
const airplanesRoute = require('./routes/airplanesRoute')
const bookingsRoute = require("./routes/bookingsRoute");

//Creating a app that represents express functionality
const app = express();

//Importing databaseconfiguration file
const dbConfig = require("./config/dbConfig");

//For json
app.use(express.json());
//Assigning the port
const port = process.env.PORT || 5000;

app.use("/api/users", usersRoute);
app.use("/api/airplanes", airplanesRoute);
app.use("/api/bookings", bookingsRoute);
app.get('/', (req, res) => {
    res.send("Hello world")   
})
module.exports = app;