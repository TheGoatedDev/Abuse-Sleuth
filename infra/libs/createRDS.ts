import * as aws from "@pulumi/aws";
import { Vpc } from "@pulumi/awsx/ec2";
import * as config from '../utils/config'


export const createRDS = async (vpc: Vpc) => {

    const dbSecurityGroup = new aws.ec2.SecurityGroup(`${config.fullName}-db-security-group`, {
        vpcId: vpc.id,
        egress: [
            {
                protocol: "tcp",
                fromPort: 5432,
                toPort: 5432,
                cidrBlocks: (await vpc.privateSubnets).map(subnet => subnet.subnet.cidrBlock.apply(t => t as string))
            }
        ],
        ingress: [{
            protocol: "tcp",
            fromPort: 5432,
            toPort: 5432,
            cidrBlocks: (await vpc.privateSubnets).map(subnet => subnet.subnet.cidrBlock.apply(t => t as string))
        }],
        tags: config.tags
    });

    const dbSubnetGroup = new aws.rds.SubnetGroup(`${config.fullName}-db-subnet-group`, {
        name: `${config.fullName}-db-subnet-group`,
        subnetIds: vpc.isolatedSubnetIds,
        tags: config.tags
    });

    // Setup Database
    const dbCluster = new aws.rds.Cluster(`${config.fullName}-db-cluster`, {
        clusterIdentifier: `${config.fullName}-db-cluster`,

        databaseName: config.rds.databaseName,

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
        masterUsername: config.rds.masterUsername,
        masterPassword: config.rds.masterPassword,
        iamDatabaseAuthenticationEnabled: true,

        vpcSecurityGroupIds: [dbSecurityGroup.id],
        dbSubnetGroupName: dbSubnetGroup.id,

        skipFinalSnapshot: true,
        tags: config.tags
    });

    let clusterInstances: aws.rds.ClusterInstance[] = [];

    for (let i = 1; i <= config.rds.instanceCount; i++) {
        clusterInstances.push(
            new aws.rds.ClusterInstance(`${config.fullName}-db-instance-${i}`, {
                clusterIdentifier: dbCluster.id,
                identifier: `${config.fullName}-db-instance-${i}`,

                instanceClass: "db.serverless",
                engine: dbCluster.engine.apply(
                    (value) => value as aws.rds.EngineType
                ),
                engineVersion: dbCluster.engineVersion,
                publiclyAccessible: config.rds.isPublic,
                tags: config.tags
            })
        );
    }

    return {
        securityGroup: dbSecurityGroup,
        cluster: dbCluster,
        instances: clusterInstances,
        subnetGroup: dbSubnetGroup,
    }

}
