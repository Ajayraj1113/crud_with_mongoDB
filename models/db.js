const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://Ajay123:1234567890@cluster0.jueqoix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("database connected successfully")
    } catch (error) {
        console.log("Something went wrong", error)
    }
} 

module.exports = connectDB