import chalk from "chalk";

const logger = {
    info: (...args: any[]) =>
        console.log(new Date().toISOString(), chalk.green("INFO"), ...args),
    error: (...args: any[]) =>
        console.error(
            new Date().toISOString(),
            `[${__filename.split("\\").pop()}]`,
            chalk.red("ERROR"),
            ...args
        ),
    debug: (...args: any[]) =>
        console.debug(
            new Date().toISOString(),
            `[${__filename.split("\\").pop()}]`,
            chalk.magenta("DEBUG"),
            ...args
        ),
};

export default logger;
