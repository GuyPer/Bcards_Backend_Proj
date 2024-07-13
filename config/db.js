require('dotenv').config();
const mongoose = require('mongoose');
const chalk = require("chalk");

const mode = process.env.NODE_ENV;  // 'prod' or 'dev'
const dbEnv= process.env.DB_ENV; // `local` or `online`

let uri;

if (mode==='prod') {
  if (dbEnv ==="local"){
    uri = process.env.MONGODB_URI_PROD
    console.log(chalk.blue.bgWhite.bold(`Environment set to Local DB and PRODUCTION mode ${uri}`));
  } else {
    uri = process.env.MONGODB_SERVER_URI_PROD
    console.log(chalk.blue.bgWhite.bold(`Environment set to "Atlas" online DB and PRODUCTION mode ${uri}`));
  }
} else {
  if (dbEnv ==="local"){
    uri = process.env.MONGODB_URI_DEV
      console.log(chalk.blue.bgWhite.bold(`Environment set to Local DB and DEVELOPMENT mode ${uri}`));
  } else {
    uri = process.env.MONGODB_SERVER_URI_DEV
    console.log(chalk.blue.bgWhite.bold(`Environment set to "Atlas" online DB and DEVELOPMENT mode ${uri}`));
  }
}

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log(chalk.green.bold("Successfully connected to MongoDB"));
  } catch (err) {
    console.log(chalk.red.bgWhite.bold("Error connecting to MongoDB",err.message));
    process.exit(1)
  }
};

module.exports = connectDB;