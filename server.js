// Require
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const chalk = require('chalk');
const morganConfig = require('./config/morganConfig');
const logger = require('./middleware/loggerBadRequests');

// Initialize express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morganConfig);
app.use(express.static('public'));
app.use(logger);

// Routes
app.use('/cards', require('./routes/cardsRoutes'));
app.use('/users', require('./routes/usersRoutes'));
app.use('/auth', require('./routes/authRoutes'));

// If a request made it here, it means that it didn't match any public or api route, so it's a '404'
// Catch 404 and send the 404 page
app.use((req, res, next) => {
    console.log(chalk.red.bold("404 Error - Page Not Found"));
    res.status(404).sendFile(path.join(__dirname, 'public/pages', '404.html'));
});

// Handle any other error not caught by the app so far
app.use((error, req, res, next) => {
    console.log(chalk.red.bold(error));
    res.status(500).json({ success: false, message: 'Unhandled server error' });
});

const { PORT } = process.env;

// Connect to database
connectDB().then(() => {
    // Run server
    app.listen(PORT, () => console.log(chalk.blue.bgWhite.bold(`Server is listening for requests on http://127.0.0.1:${PORT}`)));
});