import winston from "winston";

const myFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} | ${level} | ${message}`;
});

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.colorize({ level: true }),
        winston.format.timestamp(),
        winston.format.prettyPrint(),
        myFormat
    ),
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
        new winston.transports.File({ filename: "debug.log", level: "debug" }),
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
    logger.add(new winston.transports.Console({}));
}

export const log = logger;
