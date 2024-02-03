//Importing mongoose
const mongoose = require("mongoose");

mongoose.connect(process.env.mongo_url);

//Creating a connection object
const db = mongoose.connection;

//Checking if the database is connected
db.on("connected", () => {
  console.log("Database Successfully Connected");
});

//AND IF THE DATABASE IS NOT CONNECTED
db.on('error', ()=>{
    console.log('Mongodb connection failed');
})