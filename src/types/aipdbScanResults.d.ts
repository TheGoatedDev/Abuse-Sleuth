type IAIPDBScanResultData = {
    abuseConfidenceScore: number;
    countryCode: string;
    usageType: string;
    isp: string;
    domain: string;
    totalReports: number;
    numDistinctReporters: number;
};

type IAIPDBScanResultUpdateData = {
    abuseConfidenceScore?: number;
    countryCode?: string;
    usageType?: string;
    isp?: string;
    domain?: string;
    totalReports?: number;
    numDistinctReporters?: number;
};
