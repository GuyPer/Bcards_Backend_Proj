const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const logDirectory = path.join(__dirname, '../logs');
const logFileName = path.join(logDirectory, `${new Date().toISOString().slice(0, 10)}.log`);

// Ensure log directory exists only if there is at least one request with status >= 400
let shouldCreateLogFile = false;

const logger = morgan('combined', {
    stream: {
        write: function (line) {
            if (!shouldCreateLogFile) {
                shouldCreateLogFile = true; 
                fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory); // Create log directory if it doesn't exist
            }
            fs.appendFileSync(logFileName, line + '\n'); // Append log line to the file
        }
    },
    skip: (req, res) => res.statusCode < 400
});

module.exports = logger;