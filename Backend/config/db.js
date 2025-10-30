// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    
    // === YEH RAHA AAPKA CUSTOM ERROR MESSAGE ===
    console.error("Connection Failed! MongoDB ka URL ya Password GALAT HAI.");
    
    // Yeh technical error bhi dikhayega, jo debugging ke liye zaroori hai
    console.error(`Technical Error: ${error.message}`); 
    
    // Server ko band kar dega, kyunki DB ke bina app nahi chalega
    process.exit(1); 
  }
};

module.exports = connectDB;