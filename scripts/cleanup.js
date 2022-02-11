const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const deletePromises = [
    prisma.logReport.deleteMany(),
    prisma.logReportItem.deleteMany(),
    prisma.aIPDBScanResult.deleteMany(),
    prisma.iPProfile.deleteMany(),
];

Promise.all(deletePromises).then(() => {
    console.log("Database cleaned up");
});
