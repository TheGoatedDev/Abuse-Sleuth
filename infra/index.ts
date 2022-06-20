import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

// import {generate} from 'generate-password';

// const getSecurePassword = () => {
//     return generate({
//         length: 32,
//         numbers: true,
//         exclude: '@/"'
//     })
// }

const config = new pulumi.Config();
const stack = pulumi.getStack();

// Config for Global
const region: aws.Region = config.require("aws-region");
const NODE_ENV = stack === "prod" ? "production" : "development";

// Config for RDS
const instanceCount = config.getNumber("rds-instanceCount") ?? 1;
const MultiAZ = ["a", "b", "c"].map((value) => region + value);
const dbPass = config.requireSecret("rds-password");
const dbPublic = config.getBoolean("rds-public") ?? false;

// Setup Networking
const vpc = new aws.ec2.Vpc("networking-vpc", {
    cidrBlock: "10.0.0.0/16",
});

let vpcSubnetGroups: aws.ec2.Subnet[] = [];

MultiAZ.forEach((element, i) => {
    vpcSubnetGroups.push(
        new aws.ec2.Subnet("networking-subnet-" + element, {
            vpcId: vpc.id,
            cidrBlock: `10.0.${1 + i}.0/24`,
            availabilityZone: element,
        })
    );
});

const securityGroup = new aws.ec2.SecurityGroup("networking-sg", {
    vpcId: vpc.id,
    egress: [],
    ingress: [],
});

const dbSubnetGroup = new aws.rds.SubnetGroup("database-subnet-group", {
    name: "abuse-sleuth-db-subnet-group",
    subnetIds: vpcSubnetGroups.map((t) => t.id),
});

// Setup Database User
//new aws.iam.User()

// Setup Database
const dbCluster = new aws.rds.Cluster("database-cluster", {
    clusterIdentifier: "abuse-sleuth-db",
    availabilityZones: MultiAZ,

    databaseName: "abuse_sleuth",

    // Database Engine Config
    engine: "aurora-postgresql",
    engineMode: "provisioned",
    engineVersion: "14.3",
    storageEncrypted: true,
    serverlessv2ScalingConfiguration: {
        maxCapacity: 16,
        minCapacity: 1,
    },

    // Creds Config
    masterUsername: "AS_postgres",
    masterPassword: dbPass,
    iamDatabaseAuthenticationEnabled: true,

    vpcSecurityGroupIds: [securityGroup.id],
    dbSubnetGroupName: dbSubnetGroup.id,

    skipFinalSnapshot: true,
});

let clusterInstances: aws.rds.ClusterInstance[] = [];

for (let i = 1; i <= instanceCount; i++) {
    clusterInstances.push(
        new aws.rds.ClusterInstance("database-instance-" + i, {
            clusterIdentifier: dbCluster.id,
            identifier: "instance" + "-" + i,

            instanceClass: "db.serverless",
            engine: dbCluster.engine.apply(
                (value) => value as aws.rds.EngineType
            ),
            engineVersion: dbCluster.engineVersion,
            publiclyAccessible: dbPublic,
        })
    );
}

export const dbConnectionURI = dbCluster.endpoint;
export const dbClusterPassword = dbPass;
