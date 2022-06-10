import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";

const REGION = digitalocean.Region.LON1

const main = async () => {
    const stack = pulumi.getStack()

    // Setup Database
    const dbCluster = new digitalocean.DatabaseCluster("cluster", {
        // Postgres 14
        engine: "pg",
        version: "14",

        // London
        region: REGION,

        //Cluster Machines
        size: digitalocean.DatabaseSlug.DB_1VPCU1GB,
        nodeCount: 1,
    })

    const db = new digitalocean.DatabaseDb("db", {
        name: "abuse-sleuth",
        clusterId: dbCluster.id
    });

    // Setup Application
    const app = new digitalocean.App("app", {
        spec: {
            name: "Abuse Sleuth",

            region: REGION,

            services: [

                // Next JS Service
                {
                    name: "NextJS",
                    httpPort: 8080,
                    instanceSizeSlug: "basic-xxs",
                    github: {

                    }
                },

                // Express API Service
                {
                    name: "NextJS",
                    httpPort: 8080,
                    instanceSizeSlug: "basic-xxs",
                },
            ]

        }
    })


    // Setup Project
    try {
        const project = await digitalocean.getProject({
            name: "Abuse Sleuth"
        })

        new digitalocean.ProjectResources("db-project", {
            project: project.id,
            resources: [
                dbCluster.clusterUrn,
                app.urn
            ]
        })
    } catch (error) {
        new digitalocean.Project("abuse-sleuth", {
            name: "Abuse Sleuth",
            resources: [
                dbCluster.clusterUrn,
                app.urn
            ]
        })
    }


    return {
        liveUrl: app.liveUrl
    }


}


main().catch((err) => console.error(err));


