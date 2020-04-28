const mongoose = require('mongoose');
const db = process.env.DATABASE_STRING;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error);

    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
