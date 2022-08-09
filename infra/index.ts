import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import { createVPC } from './libs/createVPC';
import { createRDS } from './libs/createRDS';


const main = async () => {
    const { vpc, publicSubnets, privateSubnets, isolatedSubnets } = await createVPC()

    const { cluster: databaseCluster, instances: databaseInstances, subnetGroup: databaseSubnetGroup, securityGroup: databaseSecurityGroup } = await createRDS(vpc)


    return {
        databaseClusterEndpoint: databaseCluster.endpoint
    }
}


main()
