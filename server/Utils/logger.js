const winston = require("winston");
const path = require("path");
const fs = require("fs");

// No need to define __dirname since it is automatically available in CommonJS
// const __dirname = __dirname || path.resolve(); // Remove this line

const logDir = path.join(__dirname, "logs");
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logFilePath = path.join(logDir, "application.log");

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: logFilePath }) 
    ],
});

logger.info("Logger initialized successfully.");

// Change from 'export default' to 'module.exports'
module.exports = logger;
