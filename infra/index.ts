import * as digitalocean from "@pulumi/digitalocean";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();
const stack = pulumi.getStack();

// Config for Global
const region: digitalocean.Region =
    config.get("region") ?? digitalocean.Region.LON1;
const NODE_ENV = stack === "prod" ? "production" : "development";

// Config for Database
const databaseInstance: digitalocean.DatabaseSlug =
    config.get("database:instance") ?? digitalocean.DatabaseSlug.DB_1VPCU1GB;
const databaseInstanceCount = config.getNumber("database:instanceCount") ?? 1;

// Config for Frontend (NextJs)
const frontendInstanceSlug = config.get("frontend:instance") ?? "basic-xxs";
const frontendInstanceCount = config.getNumber("frontend:instanceCount") ?? 1;

// Config for backend (Express)
const backendInstanceSlug = config.get("backend:instance") ?? "basic-xxs";
const backendInstanceCount = config.getNumber("backend:instanceCount") ?? 1;

// Setup Database
const dbCluster = new digitalocean.DatabaseCluster("cluster", {
    name: "abuse-sleuth-db",

    // Postgres 14
    engine: "pg",
    version: "14",

    // London
    region: region,

    //Cluster Machines
    size: databaseInstance,
    nodeCount: databaseInstanceCount,
});

const db = new digitalocean.DatabaseDb("db", {
    name: "abuse-sleuth",
    clusterId: dbCluster.id,
});

// Setup Application
const app = new digitalocean.App("app", {
    spec: {
        name: "abuse-sleuth",

        region: region,

        domainNames: [
            {
                name: "abusesleuth.com",
                type: "PRIMARY",
                zone: "abusesleuth.com",
            },
        ],

        databases: [
            {
                name: "db",
                clusterName: dbCluster.name,
                production: NODE_ENV === "production",
                engine: dbCluster.engine.apply((engine) =>
                    engine.toUpperCase()
                ),
            },
        ],

        services: [
            // Next JS Service
            {
                name: "nextjs",
                httpPort: 8080,
                instanceSizeSlug: frontendInstanceSlug,
                instanceCount: frontendInstanceCount,
                github: {
                    repo: "Abys5/Abuse-Sleuth",
                    branch: "v2",
                    deployOnPush: true,
                },
                routes: [
                    {
                        path: "/",
                    },
                ],
                buildCommand:
                    'npx turbo run build --scope="@abuse-sleuth/web" --include-dependencies',
                runCommand: "yarn workspace @abuse-sleuth/web start",
            },

            // Express API Service
            // {
            //     name: "express",
            //     httpPort: 8080,
            //     instanceSizeSlug: "basic-xxs",
            //     github: {
            //         repo: "Abys5/Abuse-Sleuth",
            //         branch: "v2",
            //         deployOnPush: true,
            //     },
            //     routes: [
            //         {
            //             path: "/api"
            //         }
            //     ]
            // },
        ],
    },
});

// Setup Database Firewall to App
const firewall = new digitalocean.DatabaseFirewall("database-firewall", {
    clusterId: dbCluster.id,
    rules: [
        {
            type: "app",
            value: app.id,
        },
    ],
});

// Setup Project
// const project = new digitalocean.Project("abuse-sleuth-project", {
//     name: "Abuse Sleuth",
//     environment: NODE_ENV,
//     description: "A SaaS IP and Domain Aggregration and Analysis for Security",
//     resources: [dbCluster.clusterUrn],
// });

export const appLiveUrl = app.liveUrl;

// // Setup Project
// try {
//     const project = await digitalocean.getProject({
//         name: "Abuse Sleuth",
//     });

//     console.log(app.urn.get(), dbCluster.clusterUrn.get());

//     new digitalocean.ProjectResources("project-resources", {
//         project: project.id,
//         resources: [app.urn, dbCluster.clusterUrn],
//     });
// } catch (error) {
//     new digitalocean.Project("abuse-sleuth-project", {
//         name: "Abuse Sleuth",
//         resources: [app.urn, dbCluster.clusterUrn],
//     });
// }
