import chalk from "chalk";

const logger = {
    info: (...args: any[]) =>
        console.log(new Date().toISOString(), chalk.green("INFO"), ...args),
    error: (...args: any[]) =>
        console.error(new Date().toISOString(), chalk.red("ERROR"), ...args),
};

export default logger;
