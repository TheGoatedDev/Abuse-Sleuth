import faker from "@faker-js/faker";

export const generateMockAIPDBData = () => {
    return {
        abuseConfidenceScore: Math.round(Math.random() * 100),
        countryCode: faker.address.countryCode(),
        usageType: "Mock Data",
        isp: faker.company.companyName(),
        domain: faker.internet.domainName(),
        totalReports: Math.round(Math.random() * 10000),
        numDistinctUsers: Math.round(Math.random() * 200),
    };
};
