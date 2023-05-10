const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

mongoose.set('strictQuery', false);

dotenv.config({path: "./.env"})

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`.blue.bold);

        const numCollections = await mongoose.connection.db
          .listCollections()
          .toArray();
        console.log(`Total number of collections: ${numCollections.length}`);

        if(numCollections.length == 0)
        {
        throw new Error("Database is empty!");
        }

        

    } catch(error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
};

module.exports = connectDB;