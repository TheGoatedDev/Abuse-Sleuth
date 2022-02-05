import faker from "@faker-js/faker";

const generateMockData = (): IAIPDBScanResultData => {
    return {
        abuseConfidenceScore: Math.round(Math.random() * 100),
        countryCode: faker.address.countryCode(),
        usageType: "Mock Usage Type",
        isp: faker.company.companyName(),
        domain: faker.internet.domainName(),
        totalReports: Math.round(Math.random() * 100),
        numDistinctReporters: Math.round(Math.random() * 100),
    };
};

export default generateMockData;
