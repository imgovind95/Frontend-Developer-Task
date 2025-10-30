const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    
    console.error("Connection Failed! MongoDB ka URL ya Password GALAT HAI.");
    
    console.error(`Technical Error: ${error.message}`); 
    
    process.exit(1); 
  }
};

module.exports = connectDB;