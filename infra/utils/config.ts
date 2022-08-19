import * as pulumi from '@pulumi/pulumi'

const config = new pulumi.Config();

export type Stacks = "development" | "staging" | "production"

// Informational and Name Scheming
export const project = pulumi.getProject()
export const stack = pulumi.getStack()

export const fullName = `${project}-${stack}`

export const tags = {
    stack
}

// RDS
export const rds = {
    instanceCount: config.requireNumber("rds-instanceCount"),
    isPublic: config.requireBoolean("rds-public"),
    databaseName: config.require("rds-databaseName"),
    // Auth
    masterUsername: config.requireSecret("rds-username"),
    masterPassword: config.requireSecret("rds-password")
}
