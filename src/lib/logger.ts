import winston from "winston"
import path from "path"

// Create logs directory path
const logDirectory = path.join(process.cwd(), "logs")

// Custom format for better readability
const customFormat = winston.format.combine(
    winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format.prettyPrint(),
)

// Create the logger
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: customFormat,
    defaultMeta: { service: "expertise-app" },
    transports: [
        // Write all logs to combined.log
        new winston.transports.File({
            filename: path.join(logDirectory, "combined.log"),
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        }),
        // Write only errors to error.log
        new winston.transports.File({
            filename: path.join(logDirectory, "error.log"),
            level: "error",
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        }),
        // Also log to console in development
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        }),
    ],
})

// Override console methods to use winston
const originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
    info: console.info,
    debug: console.debug,
}

console.log = (...args: any[]) => {
    logger.info(args.join(" "))
    originalConsole.log(...args)
}

console.error = (...args: any[]) => {
    logger.error(args.join(" "))
    originalConsole.error(...args)
}

console.warn = (...args: any[]) => {
    logger.warn(args.join(" "))
    originalConsole.warn(...args)
}

console.info = (...args: any[]) => {
    logger.info(args.join(" "))
    originalConsole.info(...args)
}

console.debug = (...args: any[]) => {
    logger.debug(args.join(" "))
    originalConsole.debug(...args)
}

export default logger
