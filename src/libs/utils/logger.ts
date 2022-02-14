import chalk from "chalk";

const Logger = {
    info: (title: string, ...args: any[]) =>
        console.log(
            new Date().toISOString(),
            chalk.green(`INFO | ${title}`),
            ...args
        ),
    warn: (title: string, ...args: any[]) =>
        console.warn(
            new Date().toISOString(),
            chalk.yellow(`WARN | ${title}`),
            ...args
        ),
    error: (title: string, ...args: any[]) =>
        console.error(
            new Date().toISOString(),
            chalk.bgRedBright(`ERROR | ${title}`),
            ...args
        ),
    debug: (title: string, ...args: any[]) =>
        console.debug(
            new Date().toISOString(),
            chalk.magenta(`DEBUG | ${title}`),
            ...args
        ),
};

export default Logger;
