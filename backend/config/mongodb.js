import mongoose from "mongoose";
//require('dotenv').config();

const connectDB = async() => {
    try {
        mongoose.connection.on('connected', () => console.log("Database Connected"))
        await mongoose.connect("mongodb+srv://Event:phyOYp24i4BzamNi@cluster0.71n4jxq.mongodb.net/Event?retryWrites=true&w=majority&appName=Cluster0")
    } catch (error) {
        console.error("DB connection error:", error.message);
    }
}
export default connectDB;