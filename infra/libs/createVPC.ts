import * as config from '../utils/config'
import { Vpc } from '@pulumi/awsx/ec2';

export const createVPC = async () => {
    const vpc = new Vpc(`${config.fullName}-vpc`, {
        cidrBlock: "10.0.0.0/16",
        subnets: [
            {
                name: `${config.fullName}-subnet-public`,
                type: "public",
            },
            {
                name: `${config.fullName}-subnet-private`,
                type: "private",
            },
            {
                name: `${config.fullName}-subnet-isolated`,
                type: "isolated",
            },
        ],

        numberOfAvailabilityZones: 2,
        tags: config.tags
    })

    return { vpc, publicSubnets: await vpc.publicSubnets, privateSubnets: await vpc.privateSubnets, isolatedSubnets: await vpc.isolatedSubnets}
}
