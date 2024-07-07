const morgan = require('morgan');
const chalk = require('chalk');

// Configure time to morgan logs
morgan.token('date', () => {
    return new Date().toISOString();
});

// Create custom format with chalk
morgan.format('custom', (tokens, req, res) => {
    // Define colors based on status code
    let statusColor = '';
    if (res.statusCode >= 400) {
        statusColor = chalk.red.bold;
    } else if (res.statusCode >= 200 && res.statusCode < 300) {
        statusColor = chalk.green.bold;
    } else {
        statusColor = chalk.yellow.bold;
    }

    return [
        chalk.blue.bold(tokens.method(req, res)),
        chalk.blue.bold(tokens.url(req, res)),
        statusColor(tokens.status(req, res)),
        chalk.yellow.bold(tokens['response-time'](req, res) + ' ms'),
        chalk.magenta.bold(tokens.date(req, res))
    ].join(' ');
});

module.exports = morgan('custom');