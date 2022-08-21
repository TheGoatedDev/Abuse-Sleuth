const fs = require("fs")
const path = require("path")

const main = async () => {
    const NODE_ENV = process.env.NODE_ENV || 'development';

    const envFilePath = path.join(__dirname, 'environments', `${NODE_ENV}`);
    const environmentVars = require(envFilePath);
    
    const apps = environmentVars.apps;
    const packages = environmentVars.packages;
    
    for (const appName of Object.keys(apps)) {
        console.log(`Unlinking App ${appName}...`);
        fs.unlink("./apps/" + appName + "/.env", () => {});
    }
    
    for (const packageName of Object.keys(packages)) {
        console.log(`Unlinking ${packageName}...`);
        fs.unlink("./packages/" + packageName + "/.env", () => {});
    }
}

main()
