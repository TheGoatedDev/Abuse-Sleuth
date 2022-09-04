const crypto = require("crypto");


const envVars = {
    "apps": {
        "web": {

            // NextAuth
            "NEXTAUTH_URL": "http://localhost:3000",
            "NEXTAUTH_SECRET": crypto.randomBytes(64).toString("hex"),

            // Provider Details
            "NEXTAUTH_GOOGLE_ID": "",
            "NEXTAUTH_GOOGLE_SECRET": "",

            "NEXTAUTH_GITHUB_ID": "",
            "NEXTAUTH_GITHUB_SECRET": ""


        }
    },
    "packages": {
        "prisma": {
            "DATABASE_URL": "postgres://postgres:postgres@db:5432/abusesleuth",
            "SHADOW_DATABASE_URL": "postgres://postgres:postgres@db:5432/shadow"
        }
    }
}

module.exports = envVars;
