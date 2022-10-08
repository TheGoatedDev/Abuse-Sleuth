const fs = require("fs")
const { stringify } = require("envfile");
const path = require("path");




const main = async () => {
    const NODE_ENV = process.env.NODE_ENV || 'development';
    
    const envFilePath = path.join(__dirname, 'environments', `${NODE_ENV}`);
    const environmentVars = require(envFilePath);
    
    const apps = environmentVars.apps;
    const packages = environmentVars.packages;
    
    for (const appName of Object.keys(apps)) {
        console.log(`Creating App Env for ${appName}...`, apps[appName]);
        fs.writeFile(`./apps/${appName}/.env`, stringify(apps[appName]), () => {});
    }
    
    for (const packageName of Object.keys(packages)) {
        console.log(`Creating Package Env for ${packageName}...`, packages[packageName]);
        fs.writeFile(`./packages/${packageName}/.env`, stringify(packages[packageName]), () => {});
    }
}

main()